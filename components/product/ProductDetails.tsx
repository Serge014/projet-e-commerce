'use client';

import { useState } from 'react';
import { IProductItem } from 'boundless-api-client';

interface ProductDetailsProps {
  product: IProductItem;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'bi-file-text' },
    { id: 'specifications', label: 'Spécifications', icon: 'bi-gear' },
    { id: 'reviews', label: 'Avis Clients', icon: 'bi-star' },
    { id: 'shipping', label: 'Livraison', icon: 'bi-truck' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="p-4">
            <h5 className="mb-3">Description du produit</h5>
            <div className="text-muted">
              {product.text?.description || 'Aucune description disponible.'}
            </div>
            
            {/* Caractéristiques principales */}
            <div className="mt-4">
              <h6 className="mb-3">Caractéristiques principales</h6>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      <strong>SKU:</strong> {product.sku}
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      <strong>Stock:</strong> {product.props?.available_qty || 0} unités
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      <strong>Statut:</strong> 
                      <span className={`ms-2 badge ${product.in_stock ? 'bg-success' : 'bg-danger'}`}>
                        {product.in_stock ? 'En stock' : 'Rupture de stock'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {product.manufacturer && (
                      <li className="mb-2">
                        <i className="bi bi-building text-primary me-2"></i>
                        <strong>Fabricant:</strong> {product.manufacturer.title}
                      </li>
                    )}
                                         {product.props?.size && (
                       <li className="mb-2">
                         <i className="bi bi-arrows-angle-expand text-primary me-2"></i>
                         <strong>Taille:</strong> {String(product.props.size)}
                       </li>
                     )}
                    {product.props?.country_of_origin && (
                      <li className="mb-2">
                        <i className="bi bi-geo-alt text-primary me-2"></i>
                        <strong>Origine:</strong> {product.props.country_of_origin}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="p-4">
            <h5 className="mb-3">Spécifications techniques</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><strong>Référence</strong></td>
                    <td>{product.sku}</td>
                  </tr>
                  <tr>
                    <td><strong>Stock disponible</strong></td>
                    <td>{product.props?.available_qty || 0} unités</td>
                  </tr>
                  <tr>
                    <td><strong>Stock réservé</strong></td>
                    <td>{product.props?.reserved_qty || 0} unités</td>
                  </tr>
                  {product.manufacturer && (
                    <tr>
                      <td><strong>Fabricant</strong></td>
                      <td>{product.manufacturer.title}</td>
                    </tr>
                  )}
                                     {product.props?.size && (
                     <tr>
                       <td><strong>Dimensions</strong></td>
                       <td>{String(product.props.size)}</td>
                     </tr>
                   )}
                  {product.props?.country_of_origin && (
                    <tr>
                      <td><strong>Pays d'origine</strong></td>
                      <td>{product.props.country_of_origin}</td>
                    </tr>
                  )}
                  <tr>
                    <td><strong>Statut fiscal</strong></td>
                    <td>
                      <span className={`badge ${product.props?.tax_status === 'taxable' ? 'bg-info' : 'bg-secondary'}`}>
                        {product.props?.tax_status === 'taxable' ? 'Taxable' : 'Non taxable'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="p-4">
            <h5 className="mb-3">Avis clients</h5>
            <div className="text-center py-5">
              <i className="bi bi-star display-1 text-warning mb-3"></i>
              <h6 className="text-muted">Aucun avis pour le moment</h6>
              <p className="text-muted">Soyez le premier à laisser un avis sur ce produit !</p>
              <button className="btn btn-outline-primary">
                <i className="bi bi-pencil me-2"></i>
                Laisser un avis
              </button>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="p-4">
            <h5 className="mb-3">Informations de livraison</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card border-0 bg-light">
                  <div className="card-body text-center">
                    <i className="bi bi-truck text-primary display-4 mb-3"></i>
                    <h6>Livraison standard</h6>
                    <p className="text-muted mb-2">3-5 jours ouvrés</p>
                    <span className="badge bg-success">Gratuite dès 50€</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card border-0 bg-light">
                  <div className="card-body text-center">
                    <i className="bi bi-lightning text-warning display-4 mb-3"></i>
                    <h6>Livraison express</h6>
                    <p className="text-muted mb-2">1-2 jours ouvrés</p>
                    <span className="badge bg-warning">+9.90€</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h6>Informations importantes</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Livraison en France métropolitaine uniquement
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Suivi de commande par email
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Possibilité de point relais
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Retour gratuit sous 30 jours
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0">
        <ul className="nav nav-tabs card-header-tabs">
          {tabs.map((tab) => (
            <li key={tab.id} className="nav-item">
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`${tab.icon} me-2`}></i>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body p-0">
        {renderTabContent()}
      </div>
    </div>
  );
} 