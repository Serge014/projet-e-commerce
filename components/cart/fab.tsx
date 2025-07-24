'use client';

import {useCart} from 'boundless-commerce-components/dist/client';
import Link from 'next/link';

export default function CartFAB() {
	const {cartId, total} = useCart();

	if (!cartId) {
		return null;
	}

	return (
		<div className="position-fixed bottom-0 end-0 p-4" style={{zIndex: 1050}}>
			{/* Badge de quantité */}
			{total && total.qty > 0 && (
				<div className="position-absolute top-0 start-100 translate-middle">
					<span className="badge bg-danger rounded-pill fs-6">
						{total.qty}
					</span>
				</div>
			)}
			
			{/* Bouton FAB */}
			<Link href={'/cart'} className="btn btn-primary btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center" 
					style={{width: '60px', height: '60px'}}>
				<i className="bi bi-cart3 fs-4"></i>
			</Link>
		</div>
	);
}
