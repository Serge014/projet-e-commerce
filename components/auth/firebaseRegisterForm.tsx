'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/firebaseAuth';
import Link from 'next/link';

export default function FirebaseRegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      if (result.success && result.user) {
        // Rediriger vers le dashboard client
        router.push('/customer/dashboard');
        location.reload();
      } else {
        setError(result.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setError('Erreur lors de l\'inscription');
    }

    setIsLoading(false);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-primary text-white text-center">
        <h4 className="mb-0">
          <i className="bi bi-person-plus me-2"></i>
          Inscription
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

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                <i className="bi bi-person me-2"></i>
                Prénom
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jean"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                <i className="bi bi-person me-2"></i>
                Nom
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Dupont"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope me-2"></i>
              Adresse email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.dupont@email.com"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 caractères"
              required
            />
            <div className="form-text">
              Le mot de passe doit contenir au moins 6 caractères
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              <i className="bi bi-lock me-2"></i>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Répétez votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Inscription en cours...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus me-2"></i>
                S'inscrire
              </>
            )}
          </button>
        </form>
      </div>
      <div className="card-footer bg-light text-center">
        <p className="mb-0">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="text-decoration-none">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
} 