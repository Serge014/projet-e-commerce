import {fetchBasicSettings} from '@/lib/settings';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {Metadata} from 'next';
import Image from 'next/image';

interface IProps {params: {slug: string}};

// Données de démonstration pour les catégories
const demoCategories = [
	/*{
		category_id: 1,
		title: 'Smartphones',
		url_key: 'smartphones',
		description: 'Découvrez notre sélection de smartphones haut de gamme avec les dernières technologies.'
	},
	{
		category_id: 2,
		title: 'Ordinateurs Portables',
		url_key: 'ordinateurs-portables',
		description: 'Ordinateurs portables performants pour tous les usages, du travail à la création.'
	},
	{
		category_id: 3,
		title: 'Audio & Casques',
		url_key: 'audio-casques',
		description: 'Casques et accessoires audio de qualité pour une expérience sonore exceptionnelle.'
	},
	{
		category_id: 4,
		title: 'Montres Connectées',
		url_key: 'montres-connectees',
		description: 'Montres intelligentes pour suivre votre santé et rester connecté.'
	},*/
	{
		category_id: 5,
		title: 'Électronique',
		url_key: 'electronique',
		description: 'Produits électroniques innovants et de qualité pour tous vos besoins technologiques.'
	},
	{
		category_id: 6,
		title: 'Vêtements',
		url_key: 'vetements',
		description: 'Mode et vêtements tendance pour tous les styles, du casual au professionnel.'
	}
];

const fetchCategory = async (slug: string) => {
	return demoCategories.find(cat => cat.url_key === slug);
};

const fetchProductsInCategory = async (slug: string) => {
	// Données de démonstration pour les produits par catégorie
	const productsByCategory: {[key: string]: any[]} = {
		/*'smartphones': [
			{
				product_id: 1,
				title: 'Smartphone Galaxy S23 Ultra',
				url_key: 'smartphone-galaxy-s23',
				sku: 'GAL-S23-001',
				description: 'Smartphone Samsung Galaxy S23 Ultra avec écran 6.8" Dynamic AMOLED 2X et appareil photo 200MP',
				image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
				price: 1299.99,
				oldPrice: 1499.99,
				in_stock: true,
				manufacturer: 'Samsung'
			}
		],
		'ordinateurs-portables': [
			{
				product_id: 2,
				title: 'MacBook Pro 14" avec puce M3 Pro',
				url_key: 'macbook-pro-13',
				sku: 'MAC-PRO-001',
				description: 'MacBook Pro 14" avec puce M3 Pro, 18GB de RAM unifiée et 512GB de stockage SSD',
				image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
				price: 2499.99,
				oldPrice: null,
				in_stock: true,
				manufacturer: 'Apple'
			}
		],
		'audio-casques': [
			{
				product_id: 3,
				title: 'Casque Audio Sony WH-1000XM5',
				url_key: 'casque-sony-wh1000xm4',
				sku: 'SONY-CAS-001',
				description: 'Casque audio sans fil Sony WH-1000XM5 avec réduction de bruit active de nouvelle génération',
				image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
				price: 399.99,
				oldPrice: 449.99,
				in_stock: true,
				manufacturer: 'Sony'
			}
		],
		'montres-connectees': [
			{
				product_id: 4,
				title: 'Apple Watch Series 8',
				url_key: 'apple-watch-series-8',
				sku: 'APPLE-WATCH-001',
				description: 'Apple Watch Series 8 avec suivi avancé de la santé, détection des chutes, ECG et monitoring de la température',
				image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
				price: 449.99,
				oldPrice: 499.99,
				in_stock: true,
				manufacturer: 'Apple'
			}
		],*/
		'electronique': [
			{
				product_id: 1,
				title: 'Smartphone Galaxy S23 Ultra',
				url_key: 'smartphone-galaxy-s23',
				sku: 'GAL-S23-001',
				description: 'Smartphone Samsung Galaxy S23 Ultra avec écran 6.8" Dynamic AMOLED 2X et appareil photo 200MP',
				image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
				price: 1299.99,
				oldPrice: 1499.99,
				in_stock: true,
				manufacturer: 'Samsung'
			},
			{
				product_id: 2,
				title: 'MacBook Pro 14" avec puce M3 Pro',
				url_key: 'macbook-pro-13',
				sku: 'MAC-PRO-001',
				description: 'MacBook Pro 14" avec puce M3 Pro, 18GB de RAM unifiée et 512GB de stockage SSD',
				image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
				price: 2499.99,
				oldPrice: null,
				in_stock: true,
				manufacturer: 'Apple'
			},
			{
				product_id: 3,
				title: 'Casque Audio Sony WH-1000XM5',
				url_key: 'casque-sony-wh1000xm4',
				sku: 'SONY-CAS-001',
				description: 'Casque audio sans fil Sony WH-1000XM5 avec réduction de bruit active de nouvelle génération',
				image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
				price: 399.99,
				oldPrice: 449.99,
				in_stock: true,
				manufacturer: 'Sony'
			},
			{
				product_id: 4,
				title: 'Apple Watch Series 8',
				url_key: 'apple-watch-series-8',
				sku: 'APPLE-WATCH-001',
				description: 'Apple Watch Series 8 avec suivi avancé de la santé, détection des chutes, ECG et monitoring de la température',
				image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
				price: 449.99,
				oldPrice: 499.99,
				in_stock: true,
				manufacturer: 'Apple'
			}
		],
		'vetements': [
			{
				product_id: 6,
				title: 'T-shirt Premium Cotton',
				url_key: 'tshirt-premium-cotton',
				sku: 'TSHIRT-001',
				description: 'T-shirt en coton premium 100% bio, coupe moderne et confortable',
				image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
				price: 29.99,
				oldPrice: 39.99,
				in_stock: true,
				manufacturer: 'EcoWear'
			},
			/*{
				product_id: 7,
				title: 'Jean Slim Fit Premium',
				url_key: 'jean-slim-fit-premium',
				sku: 'JEAN-001',
				description: 'Jean slim fit en denim premium, coupe moderne et élégante',
				image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
				price: 89.99,
				oldPrice: 119.99,
				in_stock: true,
				manufacturer: 'DenimCo'
			},
			{
				product_id: 8,
				title: 'Sneakers Urban Comfort',
				url_key: 'sneakers-urban-comfort',
				sku: 'SNEAKERS-001',
				description: 'Sneakers urbaines avec technologie de confort avancée, design moderne',
				image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
				price: 129.99,
				oldPrice: 159.99,
				in_stock: true,
				manufacturer: 'UrbanStep'
			},
			{
				product_id: 9,
				title: 'Veste Bomber Style',
				url_key: 'veste-bomber-style',
				sku: 'VESTE-001',
				description: 'Veste bomber style urbain, matériaux premium et design contemporain',
				image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
				price: 199.99,
				oldPrice: 249.99,
				in_stock: true,
				manufacturer: 'UrbanStyle'
			}*/
		]
	};

	return productsByCategory[slug] || [];
};

export default async function CategoryPage({params: {slug}}: IProps) {
	const category = await fetchCategory(slug);

	if (!category) {
		return notFound();
	}

	const products = await fetchProductsInCategory(slug);
	const settings = await fetchBasicSettings();

	return (
		<main>
			{/* Hero Section */}
			<section className="bg-gradient-primary text-bmack py-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<Link href="/collections" className="text-white-50">
											Collections
										</Link>
									</li>
									<li className="breadcrumb-item active text-white" aria-current="page">
										{category.title}
									</li>
								</ol>
							</nav>
							<h1 className="display-4 fw-bold mb-4">
								<i className="bi bi-collection me-3"></i>
								{category.title}
							</h1>
							{category.description && (
								<p className="lead">
									{category.description}
								</p>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<section className="py-5">
				<div className="container">
					{products.length === 0 ? (
						<div className="text-center py-5">
							<i className="bi bi-box-seam display-1 text-muted mb-4"></i>
							<h3 className="mb-3">Aucun produit trouvé</h3>
							<p className="text-muted mb-4">
								Cette catégorie ne contient pas encore de produits.
							</p>
							<Link href="/collections" className="btn btn-primary">
								<i className="bi bi-arrow-left me-2"></i>
								Retour aux collections
							</Link>
						</div>
					) : (
						<>
							<div className="row mb-4">
								<div className="col-12">
									<h2 className="h4 mb-0">
										{products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
									</h2>
								</div>
							</div>
							<div className="row g-4">
								{products.map((product) => (
									<div key={product.product_id} className="col-md-6 col-lg-4 col-xl-3">
										<div className="card h-100 border-0 shadow-lg rounded-3 product-card">
											{/* Image du produit */}
											<div className="card-img-top position-relative" style={{height: '250px', overflow: 'hidden'}}>
												<img
													src={product.image}
													alt={product.title}
													className="w-100 h-100"
													style={{objectFit: 'cover'}}
												/>
												{/* Badges */}
												<div className="position-absolute top-0 start-0 m-2">
													{product.oldPrice && (
														<span className="badge bg-danger fs-6">
															-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
														</span>
													)}
												</div>
												<div className="position-absolute top-0 end-0 m-2">
													<span className={`badge ${product.in_stock ? 'bg-success' : 'bg-danger'} fs-6`}>
														{product.in_stock ? 'En stock' : 'Rupture'}
													</span>
												</div>
											</div>
											
											<div className="card-body d-flex flex-column p-4">
												{/* Fabricant */}
												{product.manufacturer && (
													<div className="mb-2">
														<small className="text-primary fw-semibold">
															{product.manufacturer}
														</small>
													</div>
												)}
												
												{/* Titre */}
												<h5 className="card-title fw-bold mb-2">
													<Link href={`/products/${product.url_key}`} className="text-decoration-none text-dark">
														{product.title}
													</Link>
												</h5>
												
												{/* Description */}
												<p className="card-text text-muted small flex-grow-1 mb-3">
													{product.description.length > 100 
														? `${product.description.substring(0, 100)}...` 
														: product.description
													}
												</p>
												
												{/* Prix */}
												<div className="mb-3">
													{product.price && (
														<div className="d-flex align-items-baseline gap-2">
															<span className="fs-4 fw-bold text-primary">
																{product.price.toFixed(2)} €
															</span>
															{product.oldPrice && (
																<span className="text-decoration-line-through text-muted">
																	{product.oldPrice.toFixed(2)} €
																</span>
															)}
														</div>
													)}
												</div>
												
												{/* SKU */}
												<div className="mb-3">
													<small className="text-muted">
														Réf: {product.sku}
													</small>
												</div>
												
												{/* Boutons d'action */}
												<div className="mt-auto">
													<div className="d-grid gap-2">
														<Link 
															href={`/products/${product.url_key}`}
															className="btn btn-primary btn-lg"
														>
															<i className="bi bi-eye me-2"></i>
															Voir le produit
														</Link>
														{product.in_stock && (
															<button className="btn btn-outline-success">
																<i className="bi bi-cart-plus me-2"></i>
																Ajouter au panier
															</button>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</section>
		</main>
	);
}

export async function generateMetadata({params: {slug}}: IProps): Promise<Metadata> {
	const category = await fetchCategory(slug);

	return {
		title: category?.title,
		description: category?.description
	};
}

export async function generateStaticParams() {
	return demoCategories.map(({url_key}) => ({
		slug: url_key
	}));
} 