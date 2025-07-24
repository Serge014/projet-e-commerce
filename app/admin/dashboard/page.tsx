import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin={true} redirectTo="/auth/login">
      <div className="container-fluid py-4">
        {/* En-tête */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1">
                  <i className="bi bi-shield-check me-2 text-primary"></i>
                  Tableau de Bord Admin
                </h1>
                <p className="text-muted mb-0">Gestion de votre boutique en ligne</p>
              </div>
              <div className="text-end">
                <div className="badge bg-success fs-6">Admin</div>
                <p className="text-muted small mb-0">Dernière connexion: Aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="row mb-4">
          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Ventes du jour</h6>
                    <h3 className="fw-bold text-success mb-0">2,450€</h3>
                    <small className="text-success">
                      <i className="bi bi-arrow-up me-1"></i>
                      +12.5%
                    </small>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="bi bi-currency-euro text-success display-6"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Commandes</h6>
                    <h3 className="fw-bold text-primary mb-0">24</h3>
                    <small className="text-primary">
                      <i className="bi bi-arrow-up me-1"></i>
                      +8.2%
                    </small>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="bi bi-bag text-primary display-6"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Clients</h6>
                    <h3 className="fw-bold text-info mb-0">1,234</h3>
                    <small className="text-info">
                      <i className="bi bi-arrow-up me-1"></i>
                      +5.7%
                    </small>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <i className="bi bi-people text-info display-6"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Produits</h6>
                    <h3 className="fw-bold text-warning mb-0">156</h3>
                    <small className="text-warning">
                      <i className="bi bi-arrow-up me-1"></i>
                      +3.1%
                    </small>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <i className="bi bi-box text-warning display-6"></i>
                  </div>
                </div>
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
                  <i className="bi bi-gear me-2"></i>
                  Administration
                </h6>
              </div>
              <div className="card-body p-0">
                <div className="nav flex-column nav-pills">
                  <a href="#dashboard" className="nav-link active">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Tableau de bord
                  </a>
                  <a href="#products" className="nav-link">
                    <i className="bi bi-box me-2"></i>
                    Produits
                  </a>
                  <a href="#orders" className="nav-link">
                    <i className="bi bi-bag me-2"></i>
                    Commandes
                  </a>
                  <a href="#customers" className="nav-link">
                    <i className="bi bi-people me-2"></i>
                    Clients
                  </a>
                  <a href="#analytics" className="nav-link">
                    <i className="bi bi-graph-up me-2"></i>
                    Analytics
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
            {/* Commandes récentes */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-clock me-2 text-primary"></i>
                  Commandes récentes
                </h5>
                <Link href="/admin/orders" className="btn btn-primary btn-sm">
                  Voir toutes
                </Link>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Commande</th>
                        <th>Client</th>
                        <th>Produits</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>#12345</strong>
                          <br />
                          <small className="text-muted">Il y a 2h</small>
                        </td>
                        <td>Jean Dupont</td>
                        <td>Smartphone Galaxy S23</td>
                        <td>899€</td>
                        <td>
                          <span className="badge bg-warning">En cours</span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary">Voir</button>
                            <button className="btn btn-outline-success">Valider</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>#12344</strong>
                          <br />
                          <small className="text-muted">Il y a 4h</small>
                        </td>
                        <td>Marie Martin</td>
                        <td>Casque Sony WH-1000XM4</td>
                        <td>299€</td>
                        <td>
                          <span className="badge bg-success">Livrée</span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary">Voir</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>#12343</strong>
                          <br />
                          <small className="text-muted">Il y a 6h</small>
                        </td>
                        <td>Pierre Durand</td>
                        <td>MacBook Pro 13"</td>
                        <td>1,299€</td>
                        <td>
                          <span className="badge bg-info">Expédiée</span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary">Voir</button>
                            <button className="btn btn-outline-info">Suivre</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Gestion des produits */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-box me-2 text-primary"></i>
                  Gestion des produits
                </h5>
                <Link href="/admin/products/add" className="btn btn-success btn-sm">
                  <i className="bi bi-plus me-2"></i>
                  Ajouter un produit
                </Link>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Produits en stock</h6>
                            <h4 className="fw-bold text-success mb-0">142</h4>
                          </div>
                          <i className="bi bi-check-circle text-success display-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Ruptures de stock</h6>
                            <h4 className="fw-bold text-danger mb-0">14</h4>
                          </div>
                          <i className="bi bi-exclamation-triangle text-danger display-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h6>Actions rapides</h6>
                  <div className="btn-group" role="group">
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-upload me-2"></i>
                      Importer CSV
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-download me-2"></i>
                      Exporter
                    </button>
                    <button className="btn btn-outline-warning">
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Mettre à jour les stocks
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-graph-up me-2 text-primary"></i>
                  Analytics
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6>Ventes par catégorie</h6>
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Smartphones</span>
                        <span className="badge bg-primary rounded-pill">45%</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Ordinateurs</span>
                        <span className="badge bg-success rounded-pill">32%</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Accessoires</span>
                        <span className="badge bg-warning rounded-pill">23%</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h6>Performance</h6>
                    <div className="row text-center">
                      <div className="col-6">
                        <div className="border rounded p-3">
                          <h4 className="text-success mb-1">98.5%</h4>
                          <small className="text-muted">Taux de satisfaction</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="border rounded p-3">
                          <h4 className="text-primary mb-1">2.3j</h4>
                          <small className="text-muted">Délai moyen de livraison</small>
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