// Système d'authentification unifié qui utilise Firebase si disponible, sinon le fallback local

import * as firebaseAuth from './firebaseAuth';
import * as fallbackAuth from './authFallback';

// Interface pour les données utilisateur
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Vérifier si Firebase est configuré
const isFirebaseAvailable = () => {
  try {
    return firebaseAuth.isAuthenticated() !== undefined;
  } catch {
    return false;
  }
};

// Fonction pour se connecter
export const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  if (isFirebaseAvailable()) {
    return await firebaseAuth.login(email, password);
  } else {
    return await fallbackAuth.login(email, password);
  }
};

// Fonction pour s'inscrire
export const register = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  if (isFirebaseAvailable()) {
    return await firebaseAuth.register(email, password, firstName, lastName);
  } else {
    return await fallbackAuth.register(email, password, firstName, lastName);
  }
};

// Fonction pour se déconnecter
export const logout = async (): Promise<void> => {
  if (isFirebaseAvailable()) {
    await firebaseAuth.logout();
  } else {
    await fallbackAuth.logout();
  }
};

// Fonction pour vérifier si un utilisateur est connecté
export const isAuthenticated = (): boolean => {
  if (isFirebaseAvailable()) {
    return firebaseAuth.isAuthenticated();
  } else {
    return fallbackAuth.isAuthenticated();
  }
};

// Fonction pour obtenir l'utilisateur connecté
export const getCurrentUser = async (): Promise<User | null> => {
  if (isFirebaseAvailable()) {
    return await firebaseAuth.getCurrentUser();
  } else {
    return await fallbackAuth.getCurrentUser();
  }
};

// Fonction pour écouter les changements d'état d'authentification
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (isFirebaseAvailable()) {
    return firebaseAuth.onAuthStateChange(callback);
  } else {
    return fallbackAuth.onAuthStateChange(callback);
  }
};

// Fonction pour vérifier les permissions admin
export const isAdmin = async (): Promise<boolean> => {
  if (isFirebaseAvailable()) {
    return await firebaseAuth.isAdmin();
  } else {
    return await fallbackAuth.isAdmin();
  }
};

// Fonction pour promouvoir un utilisateur admin
export const promoteToAdmin = async (userId: string): Promise<boolean> => {
  if (isFirebaseAvailable()) {
    return await firebaseAuth.promoteToAdmin(userId);
  } else {
    return await fallbackAuth.promoteToAdmin(userId);
  }
}; 