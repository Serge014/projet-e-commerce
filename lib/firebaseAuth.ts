import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Interface pour les données utilisateur
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Interface pour les données utilisateur dans Firestore
interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Vérifier si Firebase est configuré
const isFirebaseConfigured = () => {
  return auth !== null && db !== null;
};

// Fonction pour créer un utilisateur dans Firestore
const createUserInFirestore = async (uid: string, userData: UserData): Promise<void> => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase non configuré');
  }
  
  try {
    await setDoc(doc(db, 'users', uid), {
      ...userData,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur dans Firestore:', error);
    throw error;
  }
};

// Fonction pour récupérer un utilisateur depuis Firestore
const getUserFromFirestore = async (uid: string): Promise<User | null> => {
  if (!isFirebaseConfigured()) {
    return null;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as UserData;
      return {
        id: uid,
        ...data
      };
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
};

// Fonction pour se connecter
export const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase non configuré. Veuillez configurer vos clés Firebase.' };
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Récupérer les données utilisateur depuis Firestore
    const user = await getUserFromFirestore(firebaseUser.uid);
    
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Utilisateur non trouvé dans la base de données' };
    }
  } catch (error: any) {
    console.error('Erreur de connexion:', error);
    
    let errorMessage = 'Erreur de connexion';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Aucun compte trouvé avec cet email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Mot de passe incorrect';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email invalide';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Trop de tentatives de connexion. Réessayez plus tard';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Fonction pour s'inscrire
export const register = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase non configuré. Veuillez configurer vos clés Firebase.' };
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Mettre à jour le profil Firebase
    await updateProfile(firebaseUser, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Créer l'utilisateur dans Firestore
    const userData: UserData = {
      email,
      firstName,
      lastName,
      isAdmin: false, // Par défaut, les nouveaux utilisateurs ne sont pas admin
      createdAt: new Date()
    };
    
    await createUserInFirestore(firebaseUser.uid, userData);
    
    const user: User = {
      id: firebaseUser.uid,
      ...userData
    };
    
    return { success: true, user };
  } catch (error: any) {
    console.error('Erreur d\'inscription:', error);
    
    let errorMessage = 'Erreur d\'inscription';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Un compte existe déjà avec cet email';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email invalide';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Fonction pour se déconnecter
export const logout = async (): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase non configuré');
    return;
  }
  
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

// Fonction pour vérifier si un utilisateur est connecté
export const isAuthenticated = (): boolean => {
  if (!isFirebaseConfigured()) {
    return false;
  }
  return auth.currentUser !== null;
};

// Fonction pour obtenir l'utilisateur connecté
export const getCurrentUser = async (): Promise<User | null> => {
  if (!isFirebaseConfigured()) {
    return null;
  }
  
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  
  return await getUserFromFirestore(firebaseUser.uid);
};

// Fonction pour écouter les changements d'état d'authentification
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase non configuré');
    return () => {}; // Retourner une fonction de nettoyage vide
  }
  
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await getUserFromFirestore(firebaseUser.uid);
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Fonction pour vérifier les permissions admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.isAdmin || false;
};

// Fonction pour promouvoir un utilisateur admin (à utiliser avec précaution)
export const promoteToAdmin = async (userId: string): Promise<boolean> => {
  if (!isFirebaseConfigured()) {
    return false;
  }
  
  try {
    await setDoc(doc(db, 'users', userId), {
      isAdmin: true
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Erreur lors de la promotion admin:', error);
    return false;
  }
}; 