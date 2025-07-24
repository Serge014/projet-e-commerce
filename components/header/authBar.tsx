'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function AuthBar() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="d-flex align-items-center gap-3">
        <div className="dropdown">
          <button 
            className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2" 
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <i className="bi bi-person-circle"></i>
            <span className="d-none d-md-inline">{user.firstName}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {user.isAdmin ? (
              <>
                <li>
                  <Link href="/admin/dashboard" className="dropdown-item">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard Admin
                  </Link>
                </li>
                <li>
                  <Link href="/admin/products/add" className="dropdown-item">
                    <i className="bi bi-plus-circle me-2"></i>
                    Ajouter un produit
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/customer/dashboard" className="dropdown-item">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Mon espace client
                  </Link>
                </li>
                <li>
                  <Link href="/customer/my-orders" className="dropdown-item">
                    <i className="bi bi-bag me-2"></i>
                    Mes commandes
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <Link href="/auth/login" className="btn btn-outline-primary btn-sm">
        <i className="bi bi-box-arrow-in-right me-1"></i>
        <span className="d-none d-md-inline">Connexion</span>
      </Link>
      <Link href="/auth/register" className="btn btn-primary btn-sm">
        <i className="bi bi-person-plus me-1"></i>
        <span className="d-none d-md-inline">Inscription</span>
      </Link>
    </div>
  );
}
