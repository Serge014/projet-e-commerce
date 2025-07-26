import Link from 'next/link';
import {fetchBasicSettings} from '@/lib/settings';

export default async function ContactPage() {
  const settings = await fetchBasicSettings();

  return (
    <main>
      {/* Hero Section */}
      <section className="text-white py-5" style={{ backgroundColor: '#05f' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-envelope me-3"></i>
                Contactez-nous
              </h1>
              <p className="lead">
                Notre équipe est là pour vous aider et répondre à toutes vos questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Informations de contact */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    Nos Coordonnées
                  </h3>
                  
                  <div className="mb-4">
                    <h5 className="fw-bold">
                      <i className="bi bi-geo-alt text-primary me-2"></i>
                      Adresse
                    </h5>
                    <p className="text-muted">
                      Boulevard François Mitterand<br />
                      Abidjan, Côte d'Ivoire
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold">
                      <i className="bi bi-telephone text-primary me-2"></i>
                      Téléphone
                    </h5>
                    <p className="text-muted">
                      <a href="tel:+2250777111400" className="text-decoration-none">
                        +225 07 77 11 14 00
                      </a>
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold">
                      <i className="bi bi-envelope text-primary me-2"></i>
                      Email
                    </h5>
                    <p className="text-muted">
                      <a href="mailto:contact@boutique.fr" className="text-decoration-none">
                        contact@boutique.fr
                      </a>
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold">
                      <i className="bi bi-clock text-primary me-2"></i>
                      Horaires
                    </h5>
                    <p className="text-muted">
                      Lundi - Vendredi : 9h - 18h<br />
                      Samedi : 10h - 17h<br />
                      Dimanche : Fermé
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold mb-4">
                    <i className="bi bi-chat-dots me-2"></i>
                    Envoyez-nous un message
                  </h3>
                  
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label fw-bold">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          required
                          placeholder="Votre prénom"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label fw-bold">
                          Nom *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label fw-bold">
                          Email *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label fw-bold">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Votre numéro"
                        />
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label fw-bold">
                          Sujet *
                        </label>
                        <select className="form-select" id="subject" required>
                          <option value="">Choisissez un sujet</option>
                          <option value="commande">Question sur une commande</option>
                          <option value="produit">Information produit</option>
                          <option value="retour">Retour/Remboursement</option>
                          <option value="technique">Support technique</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      
                      <div className="col-12">
                        <label htmlFor="message" className="form-label fw-bold">
                          Message *
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          rows={5}
                          required
                          placeholder="Décrivez votre demande..."
                        ></textarea>
                      </div>
                      
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="privacy"
                            required
                          />
                          <label className="form-check-label" htmlFor="privacy">
                            J'accepte que mes données soient traitées conformément à la 
                            <Link href="/privacy" className="text-decoration-none"> politique de confidentialité</Link>
                          </label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg">
                          <i className="bi bi-send me-2"></i>
                          Envoyer le message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3 className="fw-bold mb-4">
                <i className="bi bi-question-circle me-2"></i>
                Questions Fréquentes
              </h3>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      Comment suivre ma commande ?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Vous pouvez suivre votre commande en vous connectant à votre compte client ou en utilisant le numéro de suivi envoyé par email.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      Quels sont les délais de livraison ?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Les délais de livraison varient entre 2-5 jours ouvrés selon votre localisation et le mode de livraison choisi.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Comment retourner un produit ?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Vous disposez de 30 jours pour retourner un produit. Contactez-nous pour initier le processus de retour.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 