'use client';

import Link from 'next/link';
import AuthBar from '@/components/header/authBar';
import { logout } from '@/lib/unifiedAuth';
import { useUnifiedAuth } from '@/lib/useUnifiedAuth';
import { useRouter } from 'next/navigation';

export default function Header() {
	const { user, isLoading, isAuthenticated } = useUnifiedAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		location.reload();
		router.push('/');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
			<div className="container">
				{/* Logo */}
				<Link href={'/'} className="navbar-brand text-primary fw-bold">
				<i className="bi bi-shop me-2"></i>
					TechStore
				</Link>

				{/* Bouton hamburger pour mobile */}
				<button 
					className="navbar-toggler" 
					type="button" 
					data-bs-toggle="collapse" 
					data-bs-target="#navbarNav" 
					aria-controls="navbarNav" 
					aria-expanded="false" 
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Navigation principale */}
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link href={'/'} className="nav-link">
								<i className="bi bi-house me-1"></i>
								Accueil
							</Link>
						</li>
						<li className="nav-item">
							<Link href={'/collections'} className="nav-link">
								<i className="bi bi-grid me-1"></i>
								Produits
							</Link>
						</li>
						<li className="nav-item">
							<Link href={'/about'} className="nav-link">
								<i className="bi bi-info-circle me-1"></i>
								À propos
							</Link>
						</li>
						<li className="nav-item">
							<Link href={'/contact'} className="nav-link">
								<i className="bi bi-envelope me-1"></i>
								Contact
							</Link>
						</li>
						
						{/* Menu utilisateur connecté */}
						{!isLoading && isAuthenticated && (
							<>
								<li className="nav-item">
									<Link href="/cart" className="nav-link position-relative">
										<i className="bi bi-cart3 me-1"></i>
										Panier
										{/* Badge pour le nombre d'articles */}
										<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
											3
											<span className="visually-hidden">articles dans le panier</span>
										</span>
									</Link>
								</li>
								<li className="nav-item">
									<button 
										onClick={handleLogout}
										className="nav-link border-0 bg-transparent"
										style={{ cursor: 'pointer' }}
										title="Se déconnecter"
									>
										<i className="bi bi-box-arrow-right me-1"></i>
										Déconnexion
									</button>
								</li>
							</>
						)}
						
						{/* Menu utilisateur non connecté */}
						{!isLoading && !isAuthenticated && (
							<>
								<li className="nav-item">
									<Link href="/auth/login" className="nav-link">
										<i className="bi bi-box-arrow-in-right me-1"></i>
										Connexion
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/auth/register" className="nav-link">
										<i className="bi bi-person-plus me-1"></i>
										Inscription
									</Link>
								</li>
							</>
						)}
					</ul>

					{/* Barre d'actions - maintenant vide car tout est dans le menu */}
					<div className="d-flex align-items-center gap-3">
						{/* L'espace est maintenant vide car tout est intégré dans le menu */}
					</div>
				</div>
			</div>
		</nav>
	);
}
