import {fetchBasicSettings} from '@/lib/settings';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {Metadata} from 'next';
import Image from 'next/image';

interface IProps {params: {slug: string}};

// Données de démonstration pour les catégories
const demoCategories = [
	{
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
	},
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
		'smartphones': [
			{
				product_id: 1,
				title: 'Smartphone Galaxy S23',
				url_key: 'smartphone-galaxy-s23',
				sku: 'GAL-S23-001',
				description: 'Smartphone Samsung Galaxy S23 avec écran 6.1" et appareil photo 50MP',
				image: '/assets/images/products/samsung-galaxy-s23.jpg',
				in_stock: true
			}
		],
		'ordinateurs-portables': [
			{
				product_id: 2,
				title: 'Ordinateur Portable MacBook Pro',
				url_key: 'macbook-pro-13',
				sku: 'MAC-PRO-001',
				description: 'MacBook Pro 13" avec puce M2 et 8GB de RAM unifiée',
				image: '/assets/images/products/probook.jpeg',
				in_stock: true
			}
		],
		'audio-casques': [
			{
				product_id: 3,
				title: 'Casque Audio Sony WH-1000XM4',
				url_key: 'casque-sony-wh1000xm4',
				sku: 'SONY-CAS-001',
				description: 'Casque sans fil avec réduction de bruit active',
				image: '/assets/images/products/Casque-Sans.jpg',
				in_stock: true
			}
		],
		'montres-connectees': [
			{
				product_id: 4,
				title: 'Montre Apple Watch Series 8',
				url_key: 'apple-watch-series-8',
				sku: 'APPLE-WATCH-001',
				description: 'Montre connectée Apple Watch Series 8 avec suivi santé avancé',
				image: '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg',
				in_stock: true
			},
			{
				product_id: 5,
				title: 'Montre Apple Watch Series 8',
				url_key: 'apple-watch-series-8-2',
				sku: 'APPLE-WATCH-002',
				description: 'Montre connectée Apple Watch Series 8 avec suivi santé avancé',
				image: '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg',
				in_stock: true
			}
		],
		'electronique': [
			{
				product_id: 6,
				title: 'Tablette iPad Pro 12.9"',
				url_key: 'ipad-pro-12-9',
				sku: 'APPLE-IPAD-001',
				description: 'Tablette iPad Pro 12.9" avec puce M2 et écran Liquid Retina XDR',
				image: '/assets/images/products/samsung-galaxy-s23.jpg',
				in_stock: true
			},
			{
				product_id: 7,
				title: 'Écran Gaming 27" 4K',
				url_key: 'ecran-gaming-27-4k',
				sku: 'LG-ECRAN-001',
				description: 'Écran gaming LG 27" 4K avec 144Hz et technologie FreeSync',
				image: '/assets/images/products/probook.jpeg',
				in_stock: true
			},
			{
				product_id: 8,
				title: 'Clavier Mécanique RGB',
				url_key: 'clavier-mecanique-rgb',
				sku: 'RAZER-KB-001',
				description: 'Clavier mécanique Razer avec switches optiques et éclairage RGB',
				image: '/assets/images/products/Casque-Sans.jpg',
				in_stock: true
			},
			{
				product_id: 9,
				title: 'Souris Gaming Sans Fil',
				url_key: 'souris-gaming-sans-fil',
				sku: 'LOGITECH-MOUSE-001',
				description: 'Souris gaming Logitech G Pro X Superlight avec capteur HERO 25K',
				image: '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg',
				in_stock: true
			},
			{
				product_id: 10,
				title: 'Webcam 4K Pro',
				url_key: 'webcam-4k-pro',
				sku: 'LOGITECH-WEBCAM-001',
				description: 'Webcam Logitech Brio 4K avec autofocus et micro intégré',
				image: '/assets/images/products/samsung-galaxy-s23.jpg',
				in_stock: false
			},
			{
				product_id: 11,
				title: 'Disque SSD NVMe 1TB',
				url_key: 'ssd-nvme-1tb',
				sku: 'SAMSUNG-SSD-001',
				description: 'Disque SSD Samsung 970 EVO Plus 1TB avec vitesse de lecture jusqu\'à 3,500 MB/s',
				image: '/assets/images/products/probook.jpeg',
				in_stock: true
			}
		],
		'vetements': [
			{
				product_id: 12,
				title: 'T-shirt Premium Cotton',
				url_key: 't-shirt-premium-cotton',
				sku: 'TSHIRT-COTTON-001',
				description: 'T-shirt en coton premium 100% bio, coupe moderne et confortable',
				image: '/assets/images/products/samsung-galaxy-s23.jpg',
				in_stock: true
			},
			{
				product_id: 13,
				title: 'Jean Slim Fit Premium',
				url_key: 'jean-slim-fit-premium',
				sku: 'JEAN-SLIM-001',
				description: 'Jean slim fit en denim premium avec stretch pour un confort optimal',
				image: '/assets/images/products/probook.jpeg',
				in_stock: true
			},
			{
				product_id: 14,
				title: 'Pull Hiver Laine Mérinos',
				url_key: 'pull-hiver-laine-merinos',
				sku: 'PULL-MERINOS-001',
				description: 'Pull en laine mérinos 100% naturelle, chaud et respirant',
				image: '/assets/images/products/Casque-Sans.jpg',
				in_stock: true
			},
			{
				product_id: 15,
				title: 'Veste Bomber Cuir',
				url_key: 'veste-bomber-cuir',
				sku: 'VESTE-CUIR-001',
				description: 'Veste bomber en cuir véritable, style rétro et intemporel',
				image: '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg',
				in_stock: false
			},
			{
				product_id: 16,
				title: 'Robe Cocktail Élégante',
				url_key: 'robe-cocktail-elegante',
				sku: 'ROBE-COCKTAIL-001',
				description: 'Robe cocktail en soie naturelle, coupe ajustée et élégante',
				image: '/assets/images/products/samsung-galaxy-s23.jpg',
				in_stock: true
			},
			{
				product_id: 17,
				title: 'Costume Business 3 Pièces',
				url_key: 'costume-business-3-pieces',
				sku: 'COSTUME-3P-001',
				description: 'Costume business 3 pièces en laine italienne, coupe moderne',
				image: '/assets/images/products/probook.jpeg',
				in_stock: true
			},
			{
				product_id: 18,
				title: 'Sneakers Urban Style',
				url_key: 'sneakers-urban-style',
				sku: 'SNEAKERS-URBAN-001',
				description: 'Sneakers urbaines avec semelle amortissante et design contemporain',
				image: '/assets/images/products/Casque-Sans.jpg',
				in_stock: true
			},
			{
				product_id: 19,
				title: 'Sac à Dos Laptop 15"',
				url_key: 'sac-a-dos-laptop-15',
				sku: 'SAC-LAPTOP-001',
				description: 'Sac à dos spécialement conçu pour ordinateur portable 15", compartiments organisés',
				image: '/assets/images/products/Apple-Event-Apple-Watch-Series-7-01.jpg',
				in_stock: true
			},
			{
				product_id: 20,
				title: 'Cravate Soie Italienne',
				url_key: 'cravate-soie-italienne',
				sku: 'CRAVATE-SOIE-001',
				description: 'Cravate en soie italienne 100%, motifs élégants et finition soignée',
				image: '/assets/images/products/samsung-galaxy-s23.jpg',
				in_stock: true
			}
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
			<section className="bg-gradient-primary text-white py-5">
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
										<div className="card h-100 border-0 shadow-sm">
											<div className="card-img-top position-relative" style={{height: '200px', overflow: 'hidden'}}>
												<Image
													src={product.image}
													alt={product.title}
													fill
													className="card-img-top"
													style={{objectFit: 'cover'}}
												/>
											</div>
											<div className="card-body d-flex flex-column">
												<h5 className="card-title fw-bold">
													<Link href={`/products/${product.url_key}`} className="text-decoration-none">
														{product.title}
													</Link>
												</h5>
												<p className="card-text text-muted small flex-grow-1">
													{product.description}
												</p>
												<div className="mt-auto">
													<div className="d-flex justify-content-between align-items-center mb-2">
														<small className="text-muted">SKU: {product.sku}</small>
														<span className={`badge ${product.in_stock ? 'bg-success' : 'bg-danger'}`}>
															{product.in_stock ? 'En stock' : 'Rupture'}
														</span>
													</div>
													<Link 
														href={`/products/${product.url_key}`}
														className="btn btn-primary w-100"
													>
														<i className="bi bi-eye me-2"></i>
														Voir le produit
													</Link>
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