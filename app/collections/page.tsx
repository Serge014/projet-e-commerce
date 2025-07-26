import Link from 'next/link';
import {fetchBasicSettings} from '@/lib/settings';

export default async function CollectionsPage() {
  const settings = await fetchBasicSettings();

  // Données de démonstration pour les collections
  const collections = [
    /*{
      category_id: 1,
      title: 'Smartphones',
      url_key: 'smartphones',
      description: 'Découvrez notre sélection de smartphones haut de gamme',
      image: '/assets/images/products/samsung-galaxy-s23.jpg'
    },
    {
      category_id: 2,
      title: 'Ordinateurs Portables',
      url_key: 'ordinateurs-portables',
      description: 'Ordinateurs portables pour tous les usages',
      image: '/assets/images/products/probook.jpeg'
    },
    {
      category_id: 3,
      title: 'Audio & Casques',
      url_key: 'audio-casques',
      description: 'Casques et accessoires audio de qualité',
      image: '/assets/images/products/Casque-Sans.jpg'
    },
    {
      category_id: 4,
      title: 'Montres Connectées',
      url_key: 'montres-connectees',
      description: 'Montres intelligentes pour votre bien-être',
      image: '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg'
    },*/
    {
      category_id: 5,
      title: 'Électronique',
      url_key: 'electronique',
      description: 'Produits électroniques innovants et de qualité',
      image: '/assets/images/products/samsung-galaxy-s23.jpg'
    },
    {
      category_id: 6,
      title: 'Vêtements',
      url_key: 'vetements',
      description: 'Mode et vêtements tendance pour tous les styles',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="text-white py-5" style={{ backgroundColor: '#05f' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-collection me-3"></i>
                Nos Collections
              </h1>
              <p className="lead">
                Explorez nos différentes catégories de produits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {collections.map((collection) => (
              <div key={collection.category_id} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-img-top position-relative" style={{height: '200px', overflow: 'hidden'}}>
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-100 h-100"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{collection.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {collection.description}
                    </p>
                    <Link 
                      href={`/collections/${collection.url_key}`}
                      className="btn btn-primary mt-auto"
                    >
                      <i className="bi bi-arrow-right me-2"></i>
                      Voir les produits
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3 className="fw-bold mb-3">
                <i className="bi bi-search me-2"></i>
                Vous ne trouvez pas ce que vous cherchez ?
              </h3>
              <p className="mb-4">
                Notre équipe est là pour vous aider à trouver le produit parfait
              </p>
              <Link href="/contact" className="btn btn-outline-primary btn-lg">
                <i className="bi bi-envelope me-2"></i>
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 