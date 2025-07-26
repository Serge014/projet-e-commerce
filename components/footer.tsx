import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-dark text-white py-5">
			<div className="container">
				<div className="row g-4">
					{/* Informations de l'entreprise */}
					<div className="col-lg-4 col-md-6">
						<h5 className="fw-bold mb-3 text-gradient">
							<i className="bi bi-shop me-2"></i>
							TechStore
						</h5>
						<p className="text-muted mb-3">
							Votre boutique en ligne de confiance pour tous vos besoins technologiques. 
							Qualité, prix et service au rendez-vous.
						</p>
						<div className="d-flex gap-3">
							<a href="#" className="text-white fs-4">
								<i className="bi bi-facebook"></i>
							</a>
							<a href="#" className="text-white fs-4">
								<i className="bi bi-twitter"></i>
							</a>
							<a href="#" className="text-white fs-4">
								<i className="bi bi-instagram"></i>
							</a>
							<a href="#" className="text-white fs-4">
								<i className="bi bi-linkedin"></i>
							</a>
						</div>
					</div>

					{/* Liens rapides */}
					<div className="col-lg-2 col-md-6 text-white">
						<h6 className="fw-bold mb-3">Liens Rapides</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link href="/" className="text-white text-decoration-none">
									<i className="bi bi-chevron-right me-1"></i>
									Accueil
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/collections" className="text-white text-decoration-none">
									<i className="bi bi-chevron-right me-1"></i>
									Produits
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/about" className="text-white text-decoration-none">
									<i className="bi bi-chevron-right me-1"></i>
									À propos
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/contact" className="text-white text-decoration-none">
									<i className="bi bi-chevron-right me-1"></i>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Support client */}
					<div className="col-lg-2 col-md-6">
						<h6 className="fw-bold mb-3">Support</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link href="/help" className="text-white text-decoration-none">
									<i className="bi bi-question-circle me-1"></i>
									Aide
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/shipping" className="text-white text-decoration-none">
									<i className="bi bi-truck me-1"></i>
									Livraison
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/returns" className="text-white text-decoration-none">
									<i className="bi bi-arrow-return-left me-1"></i>
									Retours
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/faq" className="text-white text-decoration-none">
									<i className="bi bi-chat-dots me-1"></i>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* Informations légales */}
					<div className="col-lg-2 col-md-6">
						<h6 className="fw-bold mb-3">Légal</h6>
						<ul className="list-unstyled">
							<li className="mb-2">
								<Link href="/terms" className="text-white text-decoration-none">
									<i className="bi bi-file-text me-1"></i>
									Conditions
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/privacy" className="text-white text-decoration-none">
									<i className="bi bi-shield-check me-1"></i>
									Confidentialité
								</Link>
							</li>
							<li className="mb-2">
								<Link href="/cookies" className="text-white text-decoration-none">
									<i className="bi bi-cookie me-1"></i>
									Cookies
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className="col-lg-2 col-md-6">
						<h6 className="fw-bold mb-3">Contact</h6>
						<ul className="list-unstyled">
							<li className="mb-2 text-white">
								<i className="bi bi-geo-alt me-1"></i>
								Boulevard François Mitterand, Abidjan, Côte d'Ivoire
							</li>
							<li className="mb-2 text-white">
								<i className="bi bi-telephone me-1"></i>
								+225 07 77 11 14 00
							</li>
							<li className="mb-2 text-white">
								<i className="bi bi-envelope me-1"></i>
								contact@techstore.fr
							</li>
						</ul>
					</div>
				</div>

				{/* Séparateur */}
				<hr className="my-4 border-secondary" />

				{/* Copyright */}
				<div className="row align-items-center">
					<div className="col-md-6">
						<p className="text-muted mb-0">
							© 2025 TechStore. Tous droits réservés.
						</p>
					</div>
					{/*<div className="col-md-6 text-md-end">
						<div className="d-flex gap-3 justify-content-md-end">
							<img src="/visa.png" alt="Visa" className="payment-icon" />
							<img src="/mastercard.png" alt="Mastercard" className="payment-icon" />
							<img src="/paypal.png" alt="PayPal" className="payment-icon" />
						</div>
					</div>*/}
				</div>
			</div>
		</footer>
	);
}
