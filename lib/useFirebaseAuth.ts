import { useState, useEffect } from 'react';
import { User, onAuthStateChange } from './firebaseAuth';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Nettoyer l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  return { 
    user, 
    isLoading, 
    isAuthenticated: !!user 
  };
} 