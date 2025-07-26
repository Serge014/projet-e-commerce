'use client';

import {useCallback, useMemo, useState} from 'react';
import SpecifyQty from '@/components/product/addToCart/specifyQty';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useCart} from 'boundless-commerce-components/dist/client';

export default function AddToCart({itemId, className, disabled}: {itemId?: number, className?: string, disabled?: boolean}) {
	const [qty, setQty] = useState<number>(1);
	const {cartId, addToCart} = useCart();

	const onAddToCartClicked = useCallback(() => {
		addToCart(itemId!, qty);
	}, [addToCart, itemId, qty]);

	const isDisabled = !itemId || !cartId || disabled;

	return (
		<div className={clsx('d-flex flex-column', className)} style={{gap: '15px'}}>
			{/* Sélecteur de quantité amélioré */}
			<div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
				<span className="fw-semibold">Quantité:</span>
				<SpecifyQty
					disabled={isDisabled}
					qty={qty}
					setQty={setQty}
				/>
			</div>

			{/* Bouton d'ajout au panier amélioré */}
			<Button
				startIcon={<AddShoppingCartIcon />}
				variant={'contained'}
				size={'large'}
				disabled={isDisabled}
				onClick={onAddToCartClicked}
				className="py-3 fw-bold"
				style={{
					background: isDisabled ? '#6c757d' : 'linear-gradient(45deg, #007bff, #0056b3)',
					borderRadius: '12px',
					boxShadow: isDisabled ? 'none' : '0 4px 15px rgba(0, 123, 255, 0.3)',
					transition: 'all 0.3s ease'
				}}
			>
				{isDisabled ? 'Indisponible' : 'Ajouter au panier'}
			</Button>

			{/* Informations supplémentaires */}
			{!isDisabled && (
				<div className="mt-3 p-3 bg-success bg-opacity-10 rounded border border-success">
					<div className="d-flex align-items-center mb-2">
						<i className="bi bi-check-circle-fill text-success me-2"></i>
						<span className="fw-semibold text-success">Produit disponible</span>
					</div>
					<div className="small text-muted">
						Livraison gratuite • Retour sous 30 jours • Garantie 2 ans
					</div>
				</div>
			)}

			{/* Bouton d'achat immédiat */}
			{!isDisabled && (
				<Button
					variant={'outlined'}
					size={'large'}
					className="py-3 fw-bold border-2"
					style={{
						borderRadius: '12px',
						borderColor: '#28a745',
						color: '#28a745',
						transition: 'all 0.3s ease'
					}}
				>
					Acheter maintenant
				</Button>
			)}
		</div>
	);
}
