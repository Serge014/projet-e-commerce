import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function CustomerDashboard() {
  return (
    <ProtectedRoute>
      <div className="container py-5">
        {/* En-tête */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1">
                  <i className="bi bi-person-circle me-2 text-primary"></i>
                  Mon Espace Client
                </h1>
                <p className="text-muted mb-0">Bienvenue dans votre espace personnel</p>
              </div>
              <div className="text-end">
                <div className="badge bg-success fs-6">Client Premium</div>
                <p className="text-muted small mb-0">Membre depuis 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-bag-check text-primary display-4 mb-3"></i>
                <h4 className="fw-bold">12</h4>
                <p className="text-muted mb-0">Commandes</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-heart text-danger display-4 mb-3"></i>
                <h4 className="fw-bold">8</h4>
                <p className="text-muted mb-0">Favoris</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-star text-warning display-4 mb-3"></i>
                <h4 className="fw-bold">4.8</h4>
                <p className="text-muted mb-0">Note moyenne</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-credit-card text-success display-4 mb-3"></i>
                <h4 className="fw-bold">3</h4>
                <p className="text-muted mb-0">Moyens de paiement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="row">
          <div className="col-lg-3 mb-4">
            {/* Navigation latérale */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">
                  <i className="bi bi-list me-2"></i>
                  Menu
                </h6>
              </div>
              <div className="card-body p-0">
                <div className="nav flex-column nav-pills">
                  <a href="#dashboard" className="nav-link active">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Tableau de bord
                  </a>
                  <a href="#orders" className="nav-link">
                    <i className="bi bi-bag me-2"></i>
                    Mes commandes
                  </a>
                  <a href="#profile" className="nav-link">
                    <i className="bi bi-person me-2"></i>
                    Mon profil
                  </a>
                  <a href="#addresses" className="nav-link">
                    <i className="bi bi-geo-alt me-2"></i>
                    Adresses
                  </a>
                  <a href="#wishlist" className="nav-link">
                    <i className="bi bi-heart me-2"></i>
                    Liste de souhaits
                  </a>
                  <a href="#reviews" className="nav-link">
                    <i className="bi bi-star me-2"></i>
                    Mes avis
                  </a>
                  <a href="#settings" className="nav-link">
                    <i className="bi bi-gear me-2"></i>
                    Paramètres
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            {/* Tableau de bord */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-speedometer2 me-2 text-primary"></i>
                  Tableau de bord
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <h6>Dernières commandes</h6>
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Commande #12345</strong>
                          <br />
                          <small className="text-muted">Smartphone Galaxy S23</small>
                        </div>
                        <span className="badge bg-success">Livrée</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Commande #12344</strong>
                          <br />
                          <small className="text-muted">Casque Sony WH-1000XM4</small>
                        </div>
                        <span className="badge bg-warning">En cours</span>
                      </div>
                    </div>
                    <Link href="/customer/my-orders" className="btn btn-outline-primary btn-sm mt-2">
                      Voir toutes les commandes
                    </Link>
                  </div>
                  <div className="col-md-6 mb-4">
                    <h6>Recommandations</h6>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <div className="card border-0 bg-light">
                          <div className="card-body text-center p-3">
                            <i className="bi bi-phone text-primary mb-2"></i>
                            <h6 className="mb-1">iPhone 15</h6>
                            <p className="text-muted small mb-2">À partir de 899€</p>
                            <button className="btn btn-primary btn-sm">Voir</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="card border-0 bg-light">
                          <div className="card-body text-center p-3">
                            <i className="bi bi-laptop text-primary mb-2"></i>
                            <h6 className="mb-1">MacBook Air</h6>
                            <p className="text-muted small mb-2">À partir de 1299€</p>
                            <button className="btn btn-primary btn-sm">Voir</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profil */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-person me-2 text-primary"></i>
                  Mon profil
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Prénom</label>
                      <input type="text" className="form-control" defaultValue="Jean" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom</label>
                      <input type="text" className="form-control" defaultValue="Dupont" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" defaultValue="customer@mail.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input type="tel" className="form-control" defaultValue="+33 6 12 34 56 78" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date de naissance</label>
                    <input type="date" className="form-control" defaultValue="1990-01-01" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check me-2"></i>
                    Sauvegarder les modifications
                  </button>
                </form>
              </div>
            </div>

            {/* Adresses */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-geo-alt me-2 text-primary"></i>
                  Mes adresses
                </h5>
                <button className="btn btn-primary btn-sm">
                  <i className="bi bi-plus me-2"></i>
                  Ajouter une adresse
                </button>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Adresse principale</h6>
                          <span className="badge bg-primary">Principale</span>
                        </div>
                        <p className="mb-2">
                          Jean Dupont<br />
                          123 Rue de la Paix<br />
                          75001 Paris<br />
                          France
                        </p>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary">Modifier</button>
                          <button className="btn btn-outline-danger">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Adresse de livraison</h6>
                        </div>
                        <p className="mb-2">
                          Jean Dupont<br />
                          456 Avenue des Champs<br />
                          69000 Lyon<br />
                          France
                        </p>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary">Modifier</button>
                          <button className="btn btn-outline-danger">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 