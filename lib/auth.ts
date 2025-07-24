// Identifiants par défaut pour l'accès à l'interface client
export const DEFAULT_CREDENTIALS = {
  email: 'customer@mail.com',
  password: '12345678'
};

// Interface pour les données utilisateur
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

// Simulation d'une base de données utilisateurs
const users: User[] = [
  {
    id: '1',
    email: 'customer@mail.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    isAdmin: false
  },
  {
    id: '2',
    email: 'admin@mail.com',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true
  }
];

// Fonction d'authentification
export const authenticateUser = (email: string, password: string): User | null => {
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

// Fonction pour récupérer un utilisateur par email
export const getUserByEmail = (email: string): User | null => {
  return users.find(user => user.email === email) || null;
};

// Fonction pour vérifier si un utilisateur est connecté
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('user');
  
  return !!(token && user);
};

// Fonction pour obtenir l'utilisateur connecté
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Fonction pour se connecter
export const login = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
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

// Fonction pour se déconnecter
export const logout = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

// Fonction pour vérifier les permissions admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.isAdmin || false;
}; 