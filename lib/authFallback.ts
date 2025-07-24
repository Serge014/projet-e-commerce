// Système d'authentification de fallback (local) quand Firebase n'est pas configuré

// Interface pour les données utilisateur
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Identifiants par défaut pour l'accès à l'interface client
export const DEFAULT_CREDENTIALS = {
  email: 'customer@mail.com',
  password: '12345678'
};

// Simulation d'une base de données utilisateurs
const users: User[] = [
  {
    id: '1',
    email: 'customer@mail.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    isAdmin: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'admin@mail.com',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true,
    createdAt: new Date('2024-01-01')
  }
];

// Fonction d'authentification
const authenticateUser = (email: string, password: string): User | null => {
  // Vérification des identifiants par défaut
  if (email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password) {
    return users.find(user => user.email === email) || null;
  }
  
  // Vérification pour l'admin
  if (email === 'admin@mail.com' && password === 'admin123') {
    return users.find(user => user.email === email) || null;
  }
  
  return null;
};

// Fonction pour se connecter
export const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  const user = authenticateUser(email, password);
  
  if (user) {
    // Stocker les informations de connexion
    localStorage.setItem('auth_token', 'demo_token_' + Date.now());
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  }
  
  return { 
    success: false, 
    error: 'Email ou mot de passe incorrect' 
  };
};

// Fonction pour s'inscrire
export const register = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return { success: false, error: 'Un compte existe déjà avec cet email' };
  }

  // Créer un nouvel utilisateur
  const newUser: User = {
    id: (users.length + 1).toString(),
    email,
    firstName,
    lastName,
    isAdmin: false,
    createdAt: new Date()
  };

  users.push(newUser);

  // Stocker les informations de connexion
  localStorage.setItem('auth_token', 'demo_token_' + Date.now());
  localStorage.setItem('user', JSON.stringify(newUser));

  return { success: true, user: newUser };
};

// Fonction pour se déconnecter
export const logout = async (): Promise<void> => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

// Fonction pour vérifier si un utilisateur est connecté
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('user');
  
  return !!(token && user);
};

// Fonction pour obtenir l'utilisateur connecté
export const getCurrentUser = async (): Promise<User | null> => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Fonction pour écouter les changements d'état d'authentification
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  // Simuler un changement d'état immédiat
  const checkAuth = async () => {
    if (isAuthenticated()) {
      const user = await getCurrentUser();
      callback(user);
    } else {
      callback(null);
    }
  };
  
  checkAuth();
  
  // Retourner une fonction de nettoyage vide
  return () => {};
};

// Fonction pour vérifier les permissions admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.isAdmin || false;
};

// Fonction pour promouvoir un utilisateur admin
export const promoteToAdmin = async (userId: string): Promise<boolean> => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.isAdmin = true;
    return true;
  }
  return false;
}; 