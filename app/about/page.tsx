import Link from 'next/link';
import {fetchBasicSettings} from '@/lib/settings';

export default async function AboutPage() {
  const settings = await fetchBasicSettings();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-info-circle me-3"></i>
                À Propos de Nous
              </h1>
              <p className="lead mb-4">
                Découvrez notre histoire, nos valeurs et notre passion pour vous offrir les meilleurs produits technologiques.
              </p>
              <Link href="/collections" className="btn btn-light btn-lg">
                <i className="bi bi-arrow-right me-2"></i>
                Découvrir nos produits
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <i className="bi bi-shop display-1 opacity-75"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">
                <i className="bi bi-clock-history text-primary me-2"></i>
                Notre Histoire
              </h2>
              <p className="lead mb-4">
                Fondée en 2020, notre boutique est née d'une passion pour la technologie et d'un désir de rendre les produits high-tech accessibles à tous.
              </p>
              <p className="mb-4">
                Depuis nos débuts, nous nous efforçons de sélectionner les meilleurs produits des marques les plus réputées, en nous assurant qu'ils répondent aux besoins de nos clients les plus exigeants.
              </p>
              <p className="mb-4">
                Notre équipe d'experts est constamment à l'affût des dernières innovations pour vous proposer une gamme de produits toujours plus performante et adaptée à vos besoins.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Chiffres Clés</h4>
                  <div className="row text-center">
                    <div className="col-6 mb-3">
                      <div className="display-6 fw-bold text-primary">3+</div>
                      <div className="text-muted">Années d'expérience</div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="display-6 fw-bold text-primary">1000+</div>
                      <div className="text-muted">Clients satisfaits</div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="display-6 fw-bold text-primary">50+</div>
                      <div className="text-muted">Produits sélectionnés</div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="display-6 fw-bold text-primary">24/7</div>
                      <div className="text-muted">Support client</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold">
                <i className="bi bi-heart text-primary me-2"></i>
                Nos Valeurs
              </h2>
              <p className="lead">
                Les principes qui guident chacune de nos actions
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-award text-primary display-4"></i>
                  </div>
                  <h4 className="card-title fw-bold">Qualité</h4>
                  <p className="card-text text-muted">
                    Nous sélectionnons uniquement des produits de la plus haute qualité, testés et approuvés par nos experts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-shield-check text-primary display-4"></i>
                  </div>
                  <h4 className="card-title fw-bold">Confiance</h4>
                  <p className="card-text text-muted">
                    La confiance de nos clients est notre plus grande récompense. Nous nous engageons à la mériter chaque jour.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 text-center">
                  <div className="mb-3">
                    <i className="bi bi-lightbulb text-primary display-4"></i>
                  </div>
                  <h4 className="card-title fw-bold">Innovation</h4>
                  <p className="card-text text-muted">
                    Nous suivons les dernières tendances technologiques pour vous proposer des solutions innovantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold">
                <i className="bi bi-people text-primary me-2"></i>
                Notre Équipe
              </h2>
              <p className="lead">
                Des experts passionnés à votre service
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle text-primary display-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">Marie Dupont</h5>
                  <p className="text-muted">Directrice Générale</p>
                  <p className="card-text small">
                    Passionnée de technologie avec 10 ans d'expérience dans le e-commerce.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle text-primary display-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">Thomas Martin</h5>
                  <p className="text-muted">Responsable Technique</p>
                  <p className="card-text small">
                    Expert en produits technologiques et en solutions innovantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle text-primary display-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">Sophie Bernard</h5>
                  <p className="text-muted">Service Client</p>
                  <p className="card-text small">
                    Toujours disponible pour vous accompagner dans vos choix.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle text-primary display-1"></i>
                  </div>
                  <h5 className="card-title fw-bold">Lucas Petit</h5>
                  <p className="text-muted">Logistique</p>
                  <p className="card-text small">
                    Garantit des livraisons rapides et soignées pour chaque commande.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3 className="fw-bold mb-3">
                <i className="bi bi-handshake me-2"></i>
                Prêt à nous faire confiance ?
              </h3>
              <p className="mb-4">
                Découvrez notre sélection de produits et rejoignez nos milliers de clients satisfaits.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link href="/collections" className="btn btn-primary btn-lg">
                  <i className="bi bi-arrow-right me-2"></i>
                  Voir nos produits
                </Link>
                <Link href="/contact" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-envelope me-2"></i>
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 