'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    manufacturer: '',
    images: [] as File[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous ajouteriez la logique pour envoyer les données au serveur
    console.log('Données du produit:', formData);
    alert('Produit ajouté avec succès !');
  };

  return (
    <ProtectedRoute requireAdmin={true} redirectTo="/auth/login">
      <div className="container py-5">
        {/* En-tête */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1">
                  <i className="bi bi-plus-circle me-2 text-primary"></i>
                  Ajouter un produit
                </h1>
                <p className="text-muted mb-0">Créez un nouveau produit pour votre boutique</p>
              </div>
              <Link href="/admin/dashboard" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Retour au dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">
                  <i className="bi bi-box me-2 text-primary"></i>
                  Informations du produit
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Informations de base */}
                  <div className="row mb-4">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Nom du produit *</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Smartphone Galaxy S23"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Référence SKU *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="Ex: GAL-S23-001"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Description *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Décrivez votre produit en détail..."
                      required
                    ></textarea>
                  </div>

                  {/* Prix et stock */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Prix (€) *</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          required
                        />
                        <span className="input-group-text">€</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Stock disponible *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Catégorie et fabricant */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Catégorie</label>
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Ordinateurs portables</option>
                        <option value="tablets">Tablettes</option>
                        <option value="accessories">Accessoires</option>
                        <option value="audio">Audio</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Fabricant</label>
                      <input
                        type="text"
                        className="form-control"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        placeholder="Ex: Samsung"
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Images du produit</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="form-text">
                      Vous pouvez sélectionner plusieurs images. Formats acceptés: JPG, PNG, GIF
                    </div>
                    
                    {/* Aperçu des images */}
                    {formData.images.length > 0 && (
                      <div className="mt-3">
                        <h6>Aperçu des images:</h6>
                        <div className="row">
                          {formData.images.map((file, index) => (
                            <div key={index} className="col-md-3 mb-2">
                              <div className="card">
                                <img
                                  src={URL.createObjectURL(file)}
                                  className="card-img-top"
                                  alt={`Aperçu ${index + 1}`}
                                  style={{ height: '100px', objectFit: 'cover' }}
                                />
                                <div className="card-body p-2">
                                  <small className="text-muted">{file.name}</small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Options supplémentaires */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Options supplémentaires</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="featured" />
                          <label className="form-check-label" htmlFor="featured">
                            Produit en vedette
                          </label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="active" defaultChecked />
                          <label className="form-check-label" htmlFor="active">
                            Actif (visible en boutique)
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="freeShipping" />
                          <label className="form-check-label" htmlFor="freeShipping">
                            Livraison gratuite
                          </label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="warranty" />
                          <label className="form-check-label" htmlFor="warranty">
                            Garantie étendue
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="bi bi-check-circle me-2"></i>
                      Créer le produit
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-lg">
                      <i className="bi bi-eye me-2"></i>
                      Aperçu
                    </button>
                    <Link href="/admin/dashboard" className="btn btn-outline-danger btn-lg">
                      <i className="bi bi-x-circle me-2"></i>
                      Annuler
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Aide et conseils */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-info text-white">
                <h6 className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Conseils pour un bon produit
                </h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Utilisez un nom clair et descriptif
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Ajoutez des images de qualité
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Décrivez tous les avantages
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Vérifiez le stock disponible
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Choisissez la bonne catégorie
                  </li>
                </ul>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white">
                <h6 className="mb-0">
                  <i className="bi bi-graph-up me-2 text-primary"></i>
                  Statistiques
                </h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-6 mb-3">
                    <h4 className="text-primary mb-1">156</h4>
                    <small className="text-muted">Produits actifs</small>
                  </div>
                  <div className="col-6 mb-3">
                    <h4 className="text-success mb-1">89%</h4>
                    <small className="text-muted">Taux de conversion</small>
                  </div>
                  <div className="col-6">
                    <h4 className="text-warning mb-1">24</h4>
                    <small className="text-muted">En rupture</small>
                  </div>
                  <div className="col-6">
                    <h4 className="text-info mb-1">12</h4>
                    <small className="text-muted">Nouveaux ce mois</small>
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