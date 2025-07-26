import {IAdapterNegativeResponse, IProductItem} from 'boundless-api-client';
import {apiClient, revalidate} from '@/lib/api';
import {notFound} from 'next/navigation';
import {fetchBasicSettings} from '@/lib/settings';
import {ProductLabels, ProductAttrs} from 'boundless-commerce-components';
import AddToCart from '@/components/product/addToCart';
import VariantPicker from '@/components/product/variantPicker';
import PriceAndSku from '@/components/product/priceAndSku';
import ProductGalleryBody from '@/components/product/productGalleryBody';
import ProductDetails from '@/components/product/ProductDetails';
import type {Metadata} from 'next';

export default async function ProductPage({params: {slug}}: IProps) {
	const product = await fetchProductBySlug(slug);
	const settings = await fetchBasicSettings();

	if (!product) {
		return notFound();
	}

	return (
		<div className="container-fluid py-5">
			{/* Breadcrumb amélioré */}
			<nav aria-label="breadcrumb" className="mb-4">
				<ol className="breadcrumb bg-light rounded p-3">
					<li className="breadcrumb-item">
						<a href="/" className="text-decoration-none text-primary">
							<i className="bi bi-house me-1"></i>
							Accueil
						</a>
					</li>
					<li className="breadcrumb-item">
						<a href="/collections" className="text-decoration-none text-primary">Produits</a>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						{product.title}
					</li>
				</ol>
			</nav>

			<div className="row g-4">
				{/* Galerie d'images améliorée */}
				<div className="col-lg-7 mb-4">
					<div className="card border-0 shadow-lg rounded-3 overflow-hidden">
						<div className="card-body p-0">
							<div className="position-relative">
								<ProductGalleryBody product={product} />
								{/* Badge de promotion */}
								{product.labels && product.labels.length > 0 && (
									<div className="position-absolute top-0 start-0 m-3">
										{product.labels.map((label, index) => (
											<span key={index} className="badge bg-danger me-2 fs-6">
												{label.title}
											</span>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Informations produit améliorées */}
				<div className="col-lg-5">
					<div className="card border-0 shadow-lg rounded-3 h-100">
						<div className="card-body p-4">
							{/* Titre et labels */}
							<div className="mb-4">
								<h1 className="h2 fw-bold mb-3 text-dark">{product.title}</h1>
								{product.labels && <ProductLabels labels={product.labels} className={'mb-3'}/>}
								
								{/* Référence produit */}
								<div className="d-flex align-items-center mb-3">
									<span className="text-muted me-2">Référence:</span>
									<code className="bg-light px-2 py-1 rounded">{product.sku}</code>
								</div>
							</div>

							{/* Prix et SKU améliorés */}
							<div className="mb-4 p-3 bg-light rounded">
								<PriceAndSku product={product} settings={settings} />
							</div>

							{/* Statut du stock amélioré */}
							<div className="mb-4">
								{product.in_stock ? (
									<div className="d-flex align-items-center p-3 bg-success bg-opacity-10 rounded border border-success">
										<i className="bi bi-check-circle-fill text-success me-3 fs-4"></i>
										<div>
											<span className="fw-semibold text-success">En stock</span>
											<div className="small text-muted">
												{product.props?.available_qty || 0} unités disponibles
											</div>
										</div>
									</div>
								) : (
									<div className="d-flex align-items-center p-3 bg-danger bg-opacity-10 rounded border border-danger">
										<i className="bi bi-x-circle-fill text-danger me-3 fs-4"></i>
										<div>
											<span className="fw-semibold text-danger">Rupture de stock</span>
											<div className="small text-muted">
												Produit temporairement indisponible
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Variantes ou ajout au panier amélioré */}
							<div className="mb-4">
								{product.has_variants ? (
									<div className="p-3 bg-light rounded">
										<h6 className="mb-3">Choisissez vos options</h6>
										<VariantPicker product={product} settings={settings}/>
									</div>
								) : (
									<div className="p-3 bg-primary bg-opacity-10 rounded border border-primary">
										<h6 className="mb-3 text-primary">Ajouter au panier</h6>
										<AddToCart
											itemId={product.item_id}
											disabled={!product.in_stock}
										/>
									</div>
								)}
							</div>

							{/* Caractéristiques rapides */}
							<div className="mb-4">
								<h6 className="mb-3">Caractéristiques</h6>
								<ProductAttrs
									characteristics={product.attributes}
									manufacturer={product.manufacturer}
									size={product.props.size}
									className={'mb-3'}
									apiClient={apiClient}
								/>
							</div>

							{/* Informations de livraison */}
							<div className="mb-4 p-3 bg-light rounded">
								<h6 className="mb-3">
									<i className="bi bi-truck me-2"></i>
									Livraison
								</h6>
								<div className="row text-center">
									<div className="col-6">
										<div className="border-end">
											<div className="fw-bold text-success">Gratuite</div>
											<div className="small text-muted">Livraison standard</div>
										</div>
									</div>
									<div className="col-6">
										<div className="fw-bold text-primary">2-3 jours</div>
										<div className="small text-muted">Délai de livraison</div>
									</div>
								</div>
							</div>

							{/* Garantie */}
							<div className="p-3 bg-warning bg-opacity-10 rounded border border-warning">
								<div className="d-flex align-items-center">
									<i className="bi bi-shield-check text-warning me-3 fs-4"></i>
									<div>
										<div className="fw-semibold text-warning">Garantie 2 ans</div>
										<div className="small text-muted">Garantie fabricant incluse</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Détails du produit */}
			<div className="row mt-5">
				<div className="col-12">
					<ProductDetails product={product} />
				</div>
			</div>
		</div>
	);
}

export async function generateMetadata({params: {slug}}: IProps): Promise<Metadata> {
	const product = await fetchProductBySlug(slug);

	return {
		title: product?.seo.title,
		description: product?.seo.metaDesc
	};
}

const fetchProductBySlug = async (slug: string): Promise<IProductItem|undefined> => {
	// Données de démonstration pour contourner l'authentification
	const demoProducts: { [key: string]: any } = {
		'smartphone-galaxy-s23': {
			product_id: 1,
			title: 'Smartphone Galaxy S23 Ultra',
			url_key: 'smartphone-galaxy-s23',
			sku: 'GAL-S23-001',
			prices: [
				{
					value: 1299.99,
					old: 1499.99,
					type: 'selling'
				}
			],
			images: [
				{
					image_id: 1,
					alt: 'Galaxy S23 Ultra - Vue avant',
					url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
				},
				{
					image_id: 2,
					alt: 'Galaxy S23 Ultra - Vue arrière',
					url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop'
				},
				{
					image_id: 3,
					alt: 'Galaxy S23 Ultra - Détails',
					url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop'
				}
			],
			in_stock: true,
			has_variants: false,
			external_id: null,
			item_id: 1,
			text: {
				description: 'Smartphone Samsung Galaxy S23 Ultra avec écran 6.8" Dynamic AMOLED 2X, appareil photo 200MP, et S Pen intégré. Performance exceptionnelle avec le processeur Snapdragon 8 Gen 2.',
				custom_title: null,
				meta_description: null
			},
			manufacturer: {
				manufacturer_id: 1,
				title: 'Samsung Electronics',
				slug: 'samsung'
			},
			props: {
				size: '6.8 pouces',
				available_qty: 8,
				reserved_qty: 2,
				country_of_origin: 'Corée du Sud',
				extra: null,
				attr_values: [],
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [
				{
					label_id: 1,
					title: 'Promotion',
					color: '#dc3545'
				},
				{
					label_id: 2,
					title: 'Nouveau',
					color: '#28a745'
				}
			],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 1299.99,
			sort_in_stock: 1,
			attributes: [
				{
					attribute_id: 1,
					title: 'Écran',
					value: '6.8" Dynamic AMOLED 2X'
				},
				{
					attribute_id: 2,
					title: 'Appareil photo',
					value: '200MP + 12MP + 10MP + 10MP'
				},
				{
					attribute_id: 3,
					title: 'Processeur',
					value: 'Snapdragon 8 Gen 2'
				},
				{
					attribute_id: 4,
					title: 'Stockage',
					value: '256GB'
				},
				{
					attribute_id: 5,
					title: 'RAM',
					value: '12GB'
				}
			] as any,
			seo: { 
				title: 'Galaxy S23 Ultra - Smartphone Premium', 
				metaDesc: 'Smartphone Samsung Galaxy S23 Ultra avec écran 6.8" et appareil photo 200MP',
				compiledTitle: 'Galaxy S23 Ultra - Smartphone Premium',
				compiledMetaDescription: 'Smartphone Samsung Galaxy S23 Ultra avec écran 6.8" et appareil photo 200MP',
				customTitle: null,
				customMetaDesc: null
			} as any
		},
		'macbook-pro-13': {
			product_id: 2,
			title: 'MacBook Pro 14" avec puce M3 Pro',
			url_key: 'macbook-pro-13',
			sku: 'MAC-PRO-001',
			prices: [
				{
					value: 2499.99,
					old: null,
					type: 'selling'
				}
			],
			images: [
				{
					image_id: 4,
					alt: 'MacBook Pro 14" - Vue avant',
					url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop'
				},
				{
					image_id: 5,
					alt: 'MacBook Pro 14" - Vue latérale',
					url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop'
				},
				{
					image_id: 6,
					alt: 'MacBook Pro 14" - Clavier',
					url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop'
				}
			],
			in_stock: true,
			has_variants: false,
			external_id: null,
			item_id: 2,
			text: {
				description: 'MacBook Pro 14" avec puce M3 Pro, 18GB de RAM unifiée et 512GB de stockage SSD. Performance exceptionnelle pour les professionnels créatifs.',
				custom_title: null,
				meta_description: null
			},
			manufacturer: {
				manufacturer_id: 2,
				title: 'Apple Inc.',
				slug: 'apple'
			},
			props: {
				size: '14 pouces',
				available_qty: 3,
				reserved_qty: 1,
				country_of_origin: 'États-Unis',
				extra: null,
				attr_values: [],
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [
				{
					label_id: 3,
					title: 'Premium',
					color: '#ffc107'
				}
			],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 2499.99,
			sort_in_stock: 1,
			attributes: [
				{
					attribute_id: 6,
					title: 'Écran',
					value: '14" Liquid Retina XDR'
				},
				{
					attribute_id: 7,
					title: 'Processeur',
					value: 'Puce M3 Pro'
				},
				{
					attribute_id: 8,
					title: 'RAM',
					value: '18GB unifiée'
				},
				{
					attribute_id: 9,
					title: 'Stockage',
					value: '512GB SSD'
				},
				{
					attribute_id: 10,
					title: 'Batterie',
					value: 'Jusqu\'à 22h'
				}
			] as any,
			seo: { title: 'MacBook Pro 14" M3 Pro', metaDesc: 'MacBook Pro 14" avec puce M3 Pro et 18GB RAM' }
		},
		'casque-sony-wh1000xm4': {
			product_id: 3,
			title: 'Casque Audio Sony WH-1000XM5',
			url_key: 'casque-sony-wh1000xm4',
			sku: 'SONY-CAS-001',
			prices: [
				{
					value: 399.99,
					old: 449.99,
					type: 'selling'
				}
			],
			images: [
				{
					image_id: 7,
					alt: 'Sony WH-1000XM5 - Vue avant',
					url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'
				},
				{
					image_id: 8,
					alt: 'Sony WH-1000XM5 - Vue latérale',
					url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop'
				},
				{
					image_id: 9,
					alt: 'Sony WH-1000XM5 - Détails',
					url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop'
				}
			],
			in_stock: true,
			has_variants: false,
			external_id: null,
			item_id: 3,
			text: {
				description: 'Casque audio sans fil Sony WH-1000XM5 avec réduction de bruit active de nouvelle génération, son haute qualité et autonomie de 30 heures.',
				custom_title: null,
				meta_description: null
			},
			manufacturer: {
				manufacturer_id: 3,
				title: 'Sony Corporation',
				slug: 'sony'
			},
			props: {
				size: 'Universal',
				available_qty: 12,
				reserved_qty: 3,
				country_of_origin: 'Japon',
				extra: null,
				attr_values: [],
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [
				{
					label_id: 4,
					title: 'Réduction',
					color: '#dc3545'
				},
				{
					label_id: 5,
					title: 'Best Seller',
					color: '#17a2b8'
				}
			],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 399.99,
			sort_in_stock: 1,
			attributes: [
				{
					attribute_id: 11,
					title: 'Type',
					value: 'Casque circum-aural'
				},
				{
					attribute_id: 12,
					title: 'Connexion',
					value: 'Bluetooth 5.2'
				},
				{
					attribute_id: 13,
					title: 'Autonomie',
					value: '30 heures'
				},
				{
					attribute_id: 14,
					title: 'Réduction de bruit',
					value: 'Active (ANC)'
				},
				{
					attribute_id: 15,
					title: 'Poids',
					value: '250g'
				}
			] as any,
			seo: { title: 'Sony WH-1000XM5 - Casque Audio Premium', metaDesc: 'Casque audio Sony WH-1000XM5 avec réduction de bruit active' }
		},
		'apple-watch-series-8': {
			product_id: 4,
			title: 'Apple Watch Series 8',
			url_key: 'apple-watch-series-8',
			sku: 'APPLE-WATCH-001',
			prices: [
				{
					value: 449.99,
					old: 499.99,
					type: 'selling'
				}
			],
			images: [
				{
					image_id: 10,
					alt: 'Apple Watch Series 8 - Vue avant',
					url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop'
				},
				{
					image_id: 11,
					alt: 'Apple Watch Series 8 - Vue latérale',
					url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'
				},
				{
					image_id: 12,
					alt: 'Apple Watch Series 8 - Détails',
					url: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop'
				},
				{
					image_id: 13,
					alt: 'Apple Watch Series 8 - Applications',
					url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop'
				}
			],
			in_stock: true,
			has_variants: true,
			external_id: null,
			item_id: 4,
			text: {
				description: 'Apple Watch Series 8 avec suivi avancé de la santé, détection des chutes, ECG et monitoring de la température. Compatible avec toutes les fonctionnalités iOS.',
				custom_title: null,
				meta_description: null
			},
			manufacturer: {
				manufacturer_id: 2,
				title: 'Apple Inc.',
				slug: 'apple'
			},
			props: {
				size: '41mm / 45mm',
				available_qty: 6,
				reserved_qty: 2,
				country_of_origin: 'États-Unis',
				extra: null,
				attr_values: [],
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [
				{
					label_id: 6,
					title: 'Nouveau',
					color: '#28a745'
				},
				{
					label_id: 7,
					title: 'Promotion',
					color: '#dc3545'
				}
			],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 449.99,
			sort_in_stock: 1,
			attributes: [
				{
					attribute_id: 16,
					title: 'Écran',
					value: 'Always-On Retina'
				},
				{
					attribute_id: 17,
					title: 'Taille',
					value: '41mm ou 45mm'
				},
				{
					attribute_id: 18,
					title: 'Batterie',
					value: 'Jusqu\'à 18h'
				},
				{
					attribute_id: 19,
					title: 'Résistance',
					value: 'IP6X, WR50'
				},
				{
					attribute_id: 20,
					title: 'Capteurs',
					value: 'ECG, Oxygène, Température'
				},
				{
					attribute_id: 21,
					title: 'Connectivité',
					value: 'GPS, Cellular (optionnel)'
				}
			] as any,
			seo: { title: 'Apple Watch Series 8 - Montre Connectée', metaDesc: 'Apple Watch Series 8 avec suivi avancé de la santé et nouvelles fonctionnalités' },
			// Ajout des variantes
			variants: [
				{
					variant_id: 1,
					title: 'Apple Watch Series 8 - 41mm',
					sku: 'APPLE-WATCH-41MM',
					prices: [
						{
							value: 449.99,
							old: 499.99,
							type: 'selling'
						}
					],
					in_stock: true,
					characteristics: [
						{
							characteristic_id: 1,
							title: 'Taille',
							value: '41mm'
						},
						{
							characteristic_id: 2,
							title: 'Couleur',
							value: 'Argent'
						}
					]
				},
				{
					variant_id: 2,
					title: 'Apple Watch Series 8 - 45mm',
					sku: 'APPLE-WATCH-45MM',
					prices: [
						{
							value: 479.99,
							old: 529.99,
							type: 'selling'
						}
					],
					in_stock: true,
					characteristics: [
						{
							characteristic_id: 1,
							title: 'Taille',
							value: '45mm'
						},
						{
							characteristic_id: 2,
							title: 'Couleur',
							value: 'Argent'
						}
					]
				}
			],
			extendedVariants: {
				characteristics: [
					{
						characteristic_id: 1,
						title: 'Taille',
						values: [
							{
								value_id: 1,
								title: '41mm'
							},
							{
								value_id: 2,
								title: '45mm'
							}
						]
					}
				],
				variants: [
					{
						variant_id: 1,
						title: 'Apple Watch Series 8 - 41mm',
						sku: 'APPLE-WATCH-41MM',
						prices: [
							{
								value: 449.99,
								old: 499.99,
								type: 'selling'
							}
						],
						in_stock: true,
						characteristics: [
							{
								characteristic_id: 1,
								value_id: 1,
								title: 'Taille',
								value: '41mm'
							}
						],
						inventoryItem: {
							item_id: 401
						}
					},
					{
						variant_id: 2,
						title: 'Apple Watch Series 8 - 45mm',
						sku: 'APPLE-WATCH-45MM',
						prices: [
							{
								value: 479.99,
								old: 529.99,
								type: 'selling'
							}
						],
						in_stock: true,
						characteristics: [
							{
								characteristic_id: 1,
								value_id: 2,
								title: 'Taille',
								value: '45mm'
							}
						],
						inventoryItem: {
							item_id: 402
						}
					}
				]
			}
		},
		'tshirt-premium-cotton': {
			product_id: 6,
			title: 'T-shirt Premium Cotton',
			url_key: 'tshirt-premium-cotton',
			sku: 'TSHIRT-001',
			prices: [
				{
					value: 29.99,
					old: 39.99,
					type: 'selling'
				}
			],
			images: [
				{
					image_id: 14,
					alt: 'T-shirt Premium Cotton - Vue avant',
					url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop'
				},
				{
					image_id: 15,
					alt: 'T-shirt Premium Cotton - Vue arrière',
					url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop'
				},
				{
					image_id: 16,
					alt: 'T-shirt Premium Cotton - Détails',
					url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=800&fit=crop'
				}
			],
			in_stock: true,
			has_variants: true,
			external_id: null,
			item_id: 6,
			text: {
				description: 'T-shirt en coton premium 100% bio, coupe moderne et confortable. Matériau respirant et durable pour un confort optimal toute la journée.',
				custom_title: null,
				meta_description: null
			},
			manufacturer: {
				manufacturer_id: 4,
				title: 'EcoWear',
				slug: 'ecowear'
			},
			props: {
				size: 'S, M, L, XL',
				available_qty: 25,
				reserved_qty: 5,
				country_of_origin: 'France',
				extra: null,
				attr_values: [],
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [
				{
					label_id: 8,
					title: 'Bio',
					color: '#28a745'
				},
				{
					label_id: 9,
					title: 'Réduction',
					color: '#dc3545'
				}
			],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 29.99,
			sort_in_stock: 1,
			attributes: [
				{
					attribute_id: 22,
					title: 'Matériau',
					value: '100% Coton Bio'
				},
				{
					attribute_id: 23,
					title: 'Entretien',
					value: 'Lavage 30°C'
				},
				{
					attribute_id: 24,
					title: 'Origine',
					value: 'France'
				},
				{
					attribute_id: 25,
					title: 'Certification',
					value: 'GOTS'
				}
			] as any,
			seo: { title: 'T-shirt Premium Cotton Bio', metaDesc: 'T-shirt en coton premium 100% bio, coupe moderne et confortable' },
			extendedVariants: {
				characteristics: [
					{
						characteristic_id: 2,
						title: 'Taille',
						values: [
							{
								value_id: 3,
								title: 'S'
							},
							{
								value_id: 4,
								title: 'M'
							},
							{
								value_id: 5,
								title: 'L'
							},
							{
								value_id: 6,
								title: 'XL'
							}
						]
					}
				],
				variants: [
					{
						variant_id: 3,
						title: 'T-shirt Premium Cotton - S',
						sku: 'TSHIRT-001-S',
						prices: [
							{
								value: 29.99,
								old: 39.99,
								type: 'selling'
							}
						],
						in_stock: true,
						characteristics: [
							{
								characteristic_id: 2,
								value_id: 3,
								title: 'Taille',
								value: 'S'
							}
						],
						inventoryItem: {
							item_id: 601
						}
					},
					{
						variant_id: 4,
						title: 'T-shirt Premium Cotton - M',
						sku: 'TSHIRT-001-M',
						prices: [
							{
								value: 29.99,
								old: 39.99,
								type: 'selling'
							}
						],
						in_stock: true,
						characteristics: [
							{
								characteristic_id: 2,
								value_id: 4,
								title: 'Taille',
								value: 'M'
							}
						],
						inventoryItem: {
							item_id: 602
						}
					},
					{
						variant_id: 5,
						title: 'T-shirt Premium Cotton - L',
						sku: 'TSHIRT-001-L',
						prices: [
							{
								value: 29.99,
								old: 39.99,
								type: 'selling'
							}
						],
						in_stock: true,
						characteristics: [
							{
								characteristic_id: 2,
								value_id: 5,
								title: 'Taille',
								value: 'L'
							}
						],
						inventoryItem: {
							item_id: 603
						}
					},
					{
						variant_id: 6,
						title: 'T-shirt Premium Cotton - XL',
						sku: 'TSHIRT-001-XL',
						prices: [
							{
								value: 29.99,
								old: 39.99,
								type: 'selling'
							}
						],
						in_stock: true,
						characteristics: [
							{
								characteristic_id: 2,
								value_id: 6,
								title: 'Taille',
								value: 'XL'
							}
						],
						inventoryItem: {
							item_id: 604
						}
					}
				]
			}
		}
	};

	return demoProducts[slug];
};

interface IProps {params: {slug: string}};

export async function generateStaticParams() {
	// Retourner des paramètres statiques pour éviter les erreurs d'authentification
	return [
		{ slug: 'smartphone-galaxy-s23' },
		{ slug: 'macbook-pro-13' },
		{ slug: 'casque-sony-wh1000xm4' },
		{ slug: 'apple-watch-series-8' },
		{ slug: 'tshirt-premium-cotton' }
	];
}
