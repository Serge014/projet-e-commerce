'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated, getCurrentUser } from '@/lib/unifiedAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Rediriger si déjà connecté
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const user = await getCurrentUser();
        if (user?.isAdmin) {
          router.push('/admin/dashboard');
          location.reload();
        } else {
          router.push('/customer/dashboard');
          location.reload();
        }
      }
    };
    
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success && result.user) {
        if (result.user.isAdmin) {
          router.push('/admin/dashboard');
          location.reload();
        } else {
          router.push('/customer/dashboard');
          location.reload();
        }
      } else {
        setError(result.error || 'Erreur de connexion');
      }
    } catch (error) {
      setError('Erreur de connexion');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                Connexion
              </h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope me-2"></i>
                    Adresse email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@mail.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-lock me-2"></i>
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="12345678"
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">
                      Se souvenir de moi
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Se connecter
                    </>
                  )}
                </button>

                <div className="text-center">
                  <Link href="/auth/restore-password" className="text-decoration-none">
                    <i className="bi bi-question-circle me-1"></i>
                    Mot de passe oublié ?
                  </Link>
                </div>
              </form>
            </div>
            <div className="card-footer bg-light text-center">
              <p className="mb-0">
                Pas encore de compte ?{' '}
                <Link href="/auth/register" className="text-decoration-none">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>

          {/* Informations de connexion par défaut */}
          <div className="card border-0 bg-light mt-3">
            <div className="card-body">
              <h6 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Identifiants de démonstration
              </h6>
              <div className="row">
                <div className="col-6">
                  <small className="text-muted">Client :</small>
                  <br />
                  <code>customer@mail.com</code>
                  <br />
                  <code>12345678</code>
                </div>
                <div className="col-6">
                  <small className="text-muted">Admin :</small>
                  <br />
                  <code>admin@mail.com</code>
                  <br />
                  <code>admin123</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
