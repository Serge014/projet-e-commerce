'use client';

import {IProductItem, TThumbRatio} from 'boundless-api-client';
import {NoImage} from 'boundless-commerce-components';
import {ProductGallery} from 'boundless-commerce-components/dist/client';
import {apiClient} from '@/lib/api';
import { useState } from 'react';

export default function ProductGalleryBody({product}: {product: IProductItem}) {
	const [isZoomed, setIsZoomed] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Vérifier si nous avons des images de démonstration avec des URLs externes
	const hasDemoImages = product.images && product.images.length > 0 && 
		product.images.some(img => (img as any).url && (img as any).url.startsWith('http'));

	if (!product.images || !product.images.length) {
		return (
			<div className="position-relative">
				<NoImage ratio={TThumbRatio['1-1']}/>
				<div className="position-absolute top-0 start-0 m-3">
					<span className="badge bg-secondary fs-6">Aucune image</span>
				</div>
			</div>
		);
	}

	// Si nous avons des images de démonstration, utiliser notre galerie personnalisée
	if (hasDemoImages) {
		const demoImages = product.images as any[];
		
		return (
			<div className="product-gallery-container">
				{/* Galerie principale */}
				<div className="position-relative">
					{/* Image principale */}
					<div className="product-image mb-3">
						<img 
							src={demoImages[currentImageIndex].url} 
							alt={demoImages[currentImageIndex].alt || product.title}
							className="img-fluid rounded-3 shadow-sm"
							style={{width: '100%', height: '400px', objectFit: 'cover'}}
						/>
						
						{/* Badges d'information */}
						<div className="position-absolute top-0 end-0 m-3">
							{product.in_stock ? (
								<span className="badge bg-success fs-6 me-2">
									<i className="bi bi-check-circle me-1"></i>
									En stock
								</span>
							) : (
								<span className="badge bg-danger fs-6 me-2">
									<i className="bi bi-x-circle me-1"></i>
									Rupture
								</span>
							)}
							
							{product.props?.available_qty && product.props.available_qty < 5 && (
								<span className="badge bg-warning text-dark fs-6">
									<i className="bi bi-exclamation-triangle me-1"></i>
									Plus que {product.props.available_qty} en stock
								</span>
							)}
						</div>

						{/* Bouton de zoom */}
						<div className="position-absolute bottom-0 end-0 m-3">
							<button 
								className="btn btn-light btn-sm rounded-circle shadow"
								onClick={() => setIsZoomed(!isZoomed)}
								title="Zoom"
							>
								<i className="bi bi-zoom-in"></i>
							</button>
						</div>

						{/* Navigation des images */}
						{demoImages.length > 1 && (
							<>
								<button 
									className="btn btn-light btn-sm rounded-circle shadow position-absolute top-50 start-0 translate-middle-y ms-3"
									onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : demoImages.length - 1)}
									title="Image précédente"
								>
									<i className="bi bi-chevron-left"></i>
								</button>
								<button 
									className="btn btn-light btn-sm rounded-circle shadow position-absolute top-50 end-0 translate-middle-y me-3"
									onClick={() => setCurrentImageIndex(prev => prev < demoImages.length - 1 ? prev + 1 : 0)}
									title="Image suivante"
								>
									<i className="bi bi-chevron-right"></i>
								</button>
							</>
						)}
					</div>

					{/* Miniatures */}
					{demoImages.length > 1 && (
						<div className="d-flex gap-2 justify-content-center">
							{demoImages.map((image, index) => (
								<button
									key={index}
									className={`gallery-thumbnail ${currentImageIndex === index ? 'active' : ''}`}
									onClick={() => setCurrentImageIndex(index)}
									style={{
										width: '80px',
										height: '80px',
										border: currentImageIndex === index ? '2px solid #007bff' : '2px solid transparent',
										overflow: 'hidden',
										background: 'none',
										padding: 0
									}}
								>
									<img 
										src={image.url} 
										alt={image.alt || `${product.title} - Image ${index + 1}`}
										className="img-fluid"
										style={{width: '100%', height: '100%', objectFit: 'cover'}}
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Informations supplémentaires sur les images */}
				<div className="mt-3 p-3 bg-light rounded">
					<div className="row text-center">
						<div className="col-4">
							<div className="small text-muted">Images</div>
							<div className="fw-bold">{demoImages.length}</div>
						</div>
						<div className="col-4">
							<div className="small text-muted">Vues</div>
							<div className="fw-bold">HD</div>
						</div>
						<div className="col-4">
							<div className="small text-muted">Zoom</div>
							<div className="fw-bold">Disponible</div>
						</div>
					</div>
				</div>

				{/* Modal de zoom */}
				{isZoomed && (
					<div 
						className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
						style={{zIndex: 1050}}
						onClick={() => setIsZoomed(false)}
					>
						<div className="position-relative">
							<img 
								src={demoImages[currentImageIndex].url} 
								alt={demoImages[currentImageIndex].alt || product.title}
								className="img-fluid rounded-3"
								style={{maxHeight: '90vh', maxWidth: '90vw'}}
							/>
							<button 
								className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle"
								onClick={() => setIsZoomed(false)}
							>
								<i className="bi bi-x-lg"></i>
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}

	// Sinon, utiliser le composant ProductGallery original
	return (
		<div className="product-gallery-container">
			{/* Galerie principale */}
			<div className="position-relative">
				<ProductGallery 
					product={product} 
					apiClient={apiClient} 
					className={'mb-4'} 
				/>
				
				{/* Badges d'information */}
				<div className="position-absolute top-0 end-0 m-3">
					{product.in_stock ? (
						<span className="badge bg-success fs-6 me-2">
							<i className="bi bi-check-circle me-1"></i>
							En stock
						</span>
					) : (
						<span className="badge bg-danger fs-6 me-2">
							<i className="bi bi-x-circle me-1"></i>
							Rupture
						</span>
					)}
					
					{product.props?.available_qty && product.props.available_qty < 5 && (
						<span className="badge bg-warning text-dark fs-6">
							<i className="bi bi-exclamation-triangle me-1"></i>
							Plus que {product.props.available_qty} en stock
						</span>
					)}
				</div>

				{/* Bouton de zoom */}
				<div className="position-absolute bottom-0 end-0 m-3">
					<button 
						className="btn btn-light btn-sm rounded-circle shadow"
						onClick={() => setIsZoomed(!isZoomed)}
						title="Zoom"
					>
						<i className="bi bi-zoom-in"></i>
					</button>
				</div>
			</div>

			{/* Informations supplémentaires sur les images */}
			<div className="mt-3 p-3 bg-light rounded">
				<div className="row text-center">
					<div className="col-4">
						<div className="small text-muted">Images</div>
						<div className="fw-bold">{product.images.length}</div>
					</div>
					<div className="col-4">
						<div className="small text-muted">Vues</div>
						<div className="fw-bold">HD</div>
					</div>
					<div className="col-4">
						<div className="small text-muted">Zoom</div>
						<div className="fw-bold">Disponible</div>
					</div>
				</div>
			</div>

			{/* Modal de zoom (simplifié) */}
			{isZoomed && (
				<div 
					className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
					style={{zIndex: 1050}}
					onClick={() => setIsZoomed(false)}
				>
					<div className="position-relative">
						<ProductGallery 
							product={product} 
							apiClient={apiClient} 
							className={'img-fluid'} 
						/>
						<button 
							className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle"
							onClick={() => setIsZoomed(false)}
						>
							<i className="bi bi-x-lg"></i>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
