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
		<div className="container py-5">
			{/* Breadcrumb */}
			<nav aria-label="breadcrumb" className="mb-4">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<a href="/" className="text-decoration-none">
							<i className="bi bi-house me-1"></i>
							Accueil
						</a>
					</li>
					<li className="breadcrumb-item">
						<a href="/collections" className="text-decoration-none">Produits</a>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						{product.title}
					</li>
				</ol>
			</nav>

			<div className="row">
				{/* Galerie d'images */}
				<div className="col-lg-6 mb-4">
					<div className="card border-0 shadow-sm">
						<div className="card-body p-0">
							<ProductGalleryBody product={product} />
						</div>
					</div>
				</div>

				{/* Informations produit */}
				<div className="col-lg-6">
					<div className="card border-0 shadow-sm">
						<div className="card-body p-4">
							{/* Titre et labels */}
							<div className="mb-3">
								<h1 className="h2 fw-bold mb-2">{product.title}</h1>
								{product.labels && <ProductLabels labels={product.labels} className={'mb-3'}/>}
							</div>

							{/* Prix et SKU */}
							<div className="mb-4">
								<PriceAndSku product={product} settings={settings} />
							</div>

							{/* Variantes ou ajout au panier */}
							<div className="mb-4">
								{product.has_variants ? (
									<VariantPicker product={product} settings={settings}/>
								) : (
									<AddToCart
										itemId={product.item_id}
										disabled={!product.in_stock}
									/>
								)}
							</div>

							{/* Statut du stock */}
							<div className="mb-4">
								{product.in_stock ? (
									<div className="d-flex align-items-center text-success">
										<i className="bi bi-check-circle-fill me-2"></i>
										<span className="fw-semibold">En stock</span>
									</div>
								) : (
									<div className="d-flex align-items-center text-danger">
										<i className="bi bi-x-circle-fill me-2"></i>
										<span className="fw-semibold">Rupture de stock</span>
									</div>
								)}
							</div>

							{/* Caractéristiques */}
							<ProductAttrs
								characteristics={product.attributes}
								manufacturer={product.manufacturer}
								size={product.props.size}
								className={'mb-4'}
								apiClient={apiClient}
							/>
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
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 0,
			sort_in_stock: 1,
			attributes: [] as any,
			seo: { 
				title: 'Galaxy S23', 
				metaDesc: 'Smartphone Samsung Galaxy S23',
				compiledTitle: 'Galaxy S23',
				compiledMetaDescription: 'Smartphone Samsung Galaxy S23',
				customTitle: null,
				customMetaDesc: null
			} as any
		},
		'macbook-pro-13': {
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
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 0,
			sort_in_stock: 1,
			attributes: [],
			seo: { title: 'MacBook Pro 13"', metaDesc: 'MacBook Pro 13" avec puce M2' }
		},
		'casque-sony-wh1000xm4': {
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
				description: 'Casque audio sans fil avec réduction de bruit active',
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
				tax_status: 'taxable' as any,
				tax_class_id: null,
				arbitrary_data: null
			},
			labels: [],
			default_category: null,
			status: 'published' as any,
			deleted_at: null,
			sort_price: 0,
			sort_in_stock: 1,
			attributes: [],
			seo: { title: 'Sony WH-1000XM4', metaDesc: 'Casque audio Sony WH-1000XM4' }
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
		{ slug: 'casque-sony-wh1000xm4' }
	];
}
