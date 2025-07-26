import Link from 'next/link';
import {Products} from 'boundless-commerce-components';
import {apiClient, revalidate} from '@/lib/api';
import {IProduct, TTaxStatus, TPublishingStatus} from 'boundless-api-client';
import {fetchBasicSettings} from '@/lib/settings';
import Image from 'next/image';

export default async function HomePage() {
  const products = await fetchProductsOnMain();
  const settings = await fetchBasicSettings();

  return (
    <main>
      {/* Hero Section */}
      <section className="text-white py-5" style={{ backgroundColor: '#05f' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 fade-in-up">
                Découvrez Notre Sélection Premium
              </h1>
              <p className="lead mb-4 fade-in-up">
                Des produits de qualité aux prix les plus compétitifs. 
                Livraison rapide et service client exceptionnel.
              </p>
              <div className="d-flex gap-3 fade-in-up">
                <Link href="/collections" className="btn btn-light btn-lg">
                  <i className="bi bi-arrow-right me-2"></i>
                  Voir nos produits
                </Link>
                <Link href="/about" className="btn btn-outline-light btn-lg">
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="slide-in-right">
                <i className="bi bi-shop display-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-truck text-primary display-4"></i>
                  </div>
                  <h5 className="card-title fw-bold">Livraison Rapide</h5>
                  <p className="card-text text-muted">
                    Livraison gratuite à partir de 50€ et expédition sous 24h
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-shield-check text-primary display-4"></i>
                  </div>
                  <h5 className="card-title fw-bold">Garantie Qualité</h5>
                  <p className="card-text text-muted">
                    30 jours de garantie satisfait ou remboursé
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="bi bi-headset text-primary display-4"></i>
                  </div>
                  <h5 className="card-title fw-bold">Support 24/7</h5>
                  <p className="card-text text-muted">
                    Notre équipe est disponible pour vous aider
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="text-gradient fw-bold mb-3">
                <i className="bi bi-star me-2"></i>
                Nos Produits Vedettes
              </h2>
              <p className="text-muted lead">
                Découvrez notre sélection de produits les plus populaires
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Products
                all={{gap: 10, perRow: 2}}
                sm={{gap: 20, perRow: 3}}
                lg={{gap: 30, perRow: 4}}
                xxl={{gap: 20, perRow: 5}}
              >
                {products.map((product) =>
                  <DemoProduct
                    product={product}
                    key={product.product_id}
                  />
                )}
              </Products>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link href="/collections" className="btn btn-primary btn-lg">
                <i className="bi bi-arrow-right me-2"></i>
                Voir tous les produits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h3 className="fw-bold mb-3">
                <i className="bi bi-envelope me-2"></i>
                Restez Informé
              </h3>
              <p className="mb-4">
                Recevez nos dernières offres et nouveautés en avant-première
              </p>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  placeholder="Votre adresse email"
                  aria-label="Email"
                />
                <button className="btn btn-primary btn-lg" type="button">
                  <i className="bi bi-send me-2"></i>
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const fetchProductsOnMain = async (): Promise<IProduct[]> => {
  // Données de démonstration pour contourner l'authentification
  const demoProducts: IProduct[] = [
    {
      product_id: 1,
      title: 'Smartphone Galaxy S23',
      url_key: 'smartphone-galaxy-s23',
      sku: 'GAL-S23-001',
      prices: [],
      images: [],
      in_stock: true,
      has_variants: false,
      external_id: null,
      item_id: 1,
      text: {
        description: 'Smartphone Samsung Galaxy S23 avec écran 6.1" et appareil photo 50MP',
        custom_title: null,
        meta_description: null
      },
      manufacturer: null,
              props: {
          size: null,
          available_qty: 10,
          reserved_qty: 0,
          country_of_origin: null,
          extra: null,
          attr_values: [],
          tax_status: TTaxStatus.taxable,
          tax_class_id: null,
          arbitrary_data: null
        },
      labels: [],
      default_category: null,
      status: TPublishingStatus.published,
      deleted_at: null,
      sort_price: 0,
      sort_in_stock: 1
    },
    {
      product_id: 2,
      title: 'Ordinateur Portable MacBook Pro',
      url_key: 'macbook-pro-13',
      sku: 'MAC-PRO-001',
      prices: [],
      images: [],
      in_stock: true,
      has_variants: false,
      external_id: null,
      item_id: 2,
      text: {
        description: 'MacBook Pro 13" avec puce M2 et 8GB de RAM unifiée',
        custom_title: null,
        meta_description: null
      },
      manufacturer: null,
      props: {
        size: null,
        available_qty: 5,
        reserved_qty: 0,
        country_of_origin: null,
        extra: null,
        attr_values: [],
        tax_status: TTaxStatus.taxable,
        tax_class_id: null,
        arbitrary_data: null
      },
      labels: [],
      default_category: null,
      status: TPublishingStatus.published,
      deleted_at: null,
      sort_price: 0,
      sort_in_stock: 1
    },
    {
      product_id: 3,
      title: 'Casque Audio Sony WH-1000XM4',
      url_key: 'casque-sony-wh1000xm4',
      sku: 'SONY-CAS-001',
      prices: [],
      images: [],
      in_stock: true,
      has_variants: false,
      external_id: null,
      item_id: 3,
      text: {
        description: 'Casque sans fil avec réduction de bruit active',
        custom_title: null,
        meta_description: null
      },
      manufacturer: null,
      props: {
        size: null,
        available_qty: 15,
        reserved_qty: 0,
        country_of_origin: null,
        extra: null,
        attr_values: [],
        tax_status: TTaxStatus.taxable,
        tax_class_id: null,
        arbitrary_data: null
      },
      labels: [],
      default_category: null,
      status: TPublishingStatus.published,
      deleted_at: null,
      sort_price: 0,
      sort_in_stock: 1
    },
    {
      product_id: 4,
      title: 'Montre Apple Watch Series 8',
      url_key: 'apple-watch-series-8',
      sku: 'APPLE-WATCH-001',
      prices: [],
      images: [],
      in_stock: true,
      has_variants: false,
      external_id: null,
      item_id: 4,
      text: {
        description: 'Montre connectée Apple Watch Series 8 avec suivi santé avancé',
        custom_title: null,
        meta_description: null
      },
      manufacturer: null,
      props: {
        size: null,
        available_qty: 8,
        reserved_qty: 0,
        country_of_origin: null,
        extra: null,
        attr_values: [],
        tax_status: TTaxStatus.taxable,
        tax_class_id: null,
        arbitrary_data: null
      },
      labels: [],
      default_category: null,
      status: TPublishingStatus.published,
      deleted_at: null,
      sort_price: 0,
      sort_in_stock: 1
    },
    /*{
      product_id: 5,
      title: 'Montre Apple Watch Series 8',
      url_key: 'apple-watch-series-8',
      sku: 'APPLE-WATCH-002',
      prices: [],
      images: [],
      in_stock: true,
      has_variants: false,
      external_id: null,
      item_id: 4,
      text: {
        description: 'Montre connectée Apple Watch Series 8 avec suivi santé avancé',
        custom_title: null,
        meta_description: null
      },
      manufacturer: null,
      props: {
        size: null,
        available_qty: 8,
        reserved_qty: 0,
        country_of_origin: null,
        extra: null,
        attr_values: [],
        tax_status: TTaxStatus.taxable,
        tax_class_id: null,
        arbitrary_data: null
      },
      labels: [],
      default_category: null,
      status: TPublishingStatus.published,
      deleted_at: null,
      sort_price: 0,
      sort_in_stock: 1
    }*/
  ];

  return demoProducts;
};

// Composant personnalisé pour afficher les produits de démonstration
function DemoProduct({product}: {product: IProduct}) {
  const getProductImage = (productId: number) => {
    switch(productId) {
      case 1:
        return '/assets/images/products/samsung-galaxy-s23.jpg';
      case 2:
        return '/assets/images/products/probook.jpeg';
      case 3:
        return '/assets/images/products/Casque-Sans.jpg';
              case 4:
          return '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg';
        /*case 5:
          return '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg';*/
        default:
          return '/assets/images/products/samsung-galaxy-s23.jpg';
    }
  };

  return (
    <div className="bdl-product">
      <div className="bdl-product__image">
        <Link href={`/products/${product.url_key || product.product_id}`}>
          <Image
            src={getProductImage(product.product_id)}
            alt={product.title}
            width={300}
            height={300}
            className="bdl-product__image-img"
            style={{objectFit: 'cover'}}
          />
        </Link>
      </div>
      <div className="bdl-product__content">
        <h3 className="bdl-product__title">
          <Link href={`/products/${product.url_key || product.product_id}`}>
            {product.title}
          </Link>
        </h3>
        <div className="bdl-product__sku">
          SKU: {product.sku}
        </div>
        <div className="bdl-product__stock">
          {product.in_stock ? 'En stock' : 'Rupture de stock'}
        </div>
      </div>
    </div>
  );
}
