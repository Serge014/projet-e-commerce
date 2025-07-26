'use client';

import {useState, useCallback} from 'react';
import {IProductItem, IVariant} from 'boundless-api-client';
import AddToCart from '@/components/product/addToCart';
import {IBasicSettings} from 'boundless-commerce-components';
import PriceAndSku from '@/components/product/priceAndSku';

export default function VariantPicker({product, settings}: {product: IProductItem, settings?: IBasicSettings}) {
	const [selectedVariant, setSelectedVariant] = useState<IVariant|undefined>();
	
	const onCaseChange = useCallback((value: {}, variant?: IVariant) => {
		setSelectedVariant(variant ? variant : undefined);
	}, []);

	if (!product.has_variants) {
		return null;
	}

	// Vérifier si nous avons des variantes dans extendedVariants
	const hasExtendedVariants = product.extendedVariants && 
		product.extendedVariants.variants && 
		product.extendedVariants.variants.length > 0;

	if (!hasExtendedVariants) {
		// Fallback : afficher un message si pas de variantes
		return (
			<div className="p-3 bg-warning bg-opacity-10 rounded border border-warning">
				<div className="d-flex align-items-center">
					<i className="bi bi-exclamation-triangle text-warning me-2"></i>
					<span className="text-warning">Variantes non disponibles</span>
				</div>
			</div>
		);
	}

	const variants = product.extendedVariants.variants;
	const characteristics = product.extendedVariants.characteristics || [];

	return (
		<div>
			{/* Sélecteur de variantes personnalisé */}
			<div className="mb-4">
				{characteristics.map((characteristic) => (
					<div key={characteristic.characteristic_id} className="mb-3">
						<label className="form-label fw-semibold">
							{characteristic.title}:
						</label>
						<div className="d-flex gap-2 flex-wrap">
							{characteristic.values?.map((value) => {
								// Trouver la variante correspondante
								const matchingVariant = variants.find(variant => 
									variant.characteristics?.some(char => 
										char.value_id === value.value_id
									)
								);
								
								const isSelected = selectedVariant && 
									selectedVariant.characteristics?.some(char => 
										char.value_id === value.value_id
									);

								return (
									<button
										key={value.value_id}
										className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
										onClick={() => {
											if (matchingVariant) {
												setSelectedVariant(matchingVariant as IVariant);
											}
										}}
										disabled={!matchingVariant}
									>
										{value.title}
									</button>
								);
							})}
						</div>
					</div>
				))}
			</div>

			{/* Affichage de la variante sélectionnée */}
			{selectedVariant && (
				<div className="mb-3 p-3 bg-light rounded">
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<strong>{selectedVariant.title}</strong>
							<div className="small text-muted">
								SKU: {selectedVariant.sku}
							</div>
						</div>
						<div className="text-end">
							{selectedVariant.in_stock ? (
								<span className="badge bg-success">En stock</span>
							) : (
								<span className="badge bg-danger">Rupture</span>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Prix et SKU pour la variante sélectionnée */}
			<PriceAndSku
				product={product}
				settings={settings}
				variant={selectedVariant}
			/>

			{/* Bouton d'ajout au panier */}
			<AddToCart
				itemId={selectedVariant?.inventoryItem?.item_id}
				disabled={!selectedVariant?.in_stock}
			/>
		</div>
	);
}
