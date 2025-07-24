'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser, User } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push(redirectTo);
        return;
      }

      const currentUser = getCurrentUser();
      if (!currentUser) {
        router.push(redirectTo);
        return;
      }

      if (requireAdmin && !currentUser.isAdmin) {
        router.push('/');
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, [requireAdmin, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Vérification de l'authentification...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 