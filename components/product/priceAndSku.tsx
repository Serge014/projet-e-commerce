import {IProductItem, IVariant} from 'boundless-api-client';
import clsx from 'clsx';
import {useFormatCurrency, IBasicSettings, IPriceForTpl, getPriceForTpl, findSellingPrice} from 'boundless-commerce-components';
import currency from 'currency.js';
import {useMemo} from 'react';

export default function PriceAndSku({product, variant, className, settings}: IProps) {
	const {formatCurrency} = useFormatCurrency({settings});
	const {price, benefit, isInStock} = useMemo(() => {
		let price: IPriceForTpl|undefined, benefit: number | null = null;
		if (variant) {
			const sellingPrice = findSellingPrice(variant.prices);
			if (sellingPrice) {
				price = {price: sellingPrice.value, oldPrice: sellingPrice.old};
			}
		} else {
			const sellingPrice = findSellingPrice(product.prices);
			if (sellingPrice) {
				price = getPriceForTpl(sellingPrice);
			}
		}

		if (price && price.price && price.oldPrice) {
			benefit = new currency(price.oldPrice).subtract(price.price).toJSON();
		}

		const isInStock = variant ? variant.in_stock : product.in_stock;

		return {price, benefit, isInStock};
	}, [product, variant]);

	return (
		<div className={clsx(className)}>
			{/* Prix principal */}
			{price?.price && (
				<div className="mb-3">
					{price.isFrom && (
						<div className="text-muted small mb-1">
							<i className="bi bi-arrow-up-circle me-1"></i>
							À partir de:
						</div>
					)}
					<div className="d-flex align-items-baseline flex-wrap">
						<span className={clsx('fs-1 fw-bold text-primary', {'text-danger': price.oldPrice})}>
							{formatCurrency(price.price)}
						</span>
						{price.oldPrice && (
							<span className="text-decoration-line-through text-muted ms-3 fs-4">
								{formatCurrency(price.oldPrice)}
							</span>
						)}
					</div>
				</div>
			)}

			{/* Économies réalisées */}
			{benefit && (
				<div className="mb-3 p-3 bg-success bg-opacity-10 rounded border border-success">
					<div className="d-flex align-items-center">
						<i className="bi bi-piggy-bank text-success me-2 fs-5"></i>
						<div>
							<div className="fw-semibold text-success">Vous économisez</div>
							<div className="fs-5 fw-bold text-success">{formatCurrency(benefit)}</div>
						</div>
					</div>
				</div>
			)}

			{/* Informations de stock et SKU */}
			{(!product.has_variants || variant) && (
				<div className="row g-3">
					<div className="col-6">
						<div className="p-3 bg-light rounded text-center">
							<div className="small text-muted mb-1">Statut</div>
							<div className={clsx('fw-bold', {'text-success': isInStock, 'text-danger': !isInStock})}>
								{isInStock ? (
									<>
										<i className="bi bi-check-circle-fill me-1"></i>
										En stock
									</>
								) : (
									<>
										<i className="bi bi-x-circle-fill me-1"></i>
										Rupture
									</>
								)}
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="p-3 bg-light rounded text-center">
							<div className="small text-muted mb-1">Référence</div>
							<div className="fw-bold text-primary">
								{variant?.sku || product.sku}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Informations supplémentaires */}
			<div className="mt-3 p-3 bg-info bg-opacity-10 rounded border border-info">
				<div className="row text-center">
					<div className="col-4">
						<div className="small text-muted">Livraison</div>
						<div className="fw-bold text-success">Gratuite</div>
					</div>
					<div className="col-4">
						<div className="small text-muted">Retour</div>
						<div className="fw-bold text-primary">30 jours</div>
					</div>
					<div className="col-4">
						<div className="small text-muted">Garantie</div>
						<div className="fw-bold text-warning">2 ans</div>
					</div>
				</div>
			</div>
		</div>
	);
}

interface IProps {
	product: Pick<IProductItem, 'prices' | 'has_variants' | 'in_stock' | 'item_id' | 'sku'>;
	variant?: IVariant;
	className?: string,
	settings?: IBasicSettings
}
