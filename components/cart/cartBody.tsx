'use client';

import {useState, useEffect, useCallback} from 'react';
import CartLoader from '@/components/cart/cartLoader';
import {useCart} from 'boundless-commerce-components/dist/client';
import {ICartItem} from 'boundless-api-client';
import {apiClient} from '@/lib/api';
import EmptyCart from '@/components/cart/cartBody/emptyCart';
import {IBasicSettings} from 'boundless-commerce-components';
import CartItems from '@/components/cart/cartBody/cartItems';
import CheckoutButtons from '@/components/cart/cartBody/checkoutButtons';

export default function CartBody({settings}: {settings: IBasicSettings}) {
	const {cartId} = useCart();
	const {items, isLoading, setItems} = useFetchCartItems();

	if (!cartId || isLoading || !items) {
		return <CartLoader />;
	}

	if (items.length == 0) {
		return <EmptyCart />;
	}

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-lg-8">
					<div className="card shadow-sm border-0">
						<div className="card-header bg-primary text-white">
							<h3 className="mb-0">
								<i className="bi bi-cart3 me-2"></i>
								Mon Panier ({items.length} article{items.length > 1 ? 's' : ''})
							</h3>
						</div>
						<div className="card-body p-0">
							<CartItems
								settings={settings}
								items={items}
								setItems={setItems}
								className={'p-4'}
							/>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="card shadow-sm border-0 sticky-top" style={{top: '2rem'}}>
						<div className="card-header bg-light">
							<h5 className="mb-0">
								<i className="bi bi-receipt me-2"></i>
								Récapitulatif
							</h5>
						</div>
						<div className="card-body">
							<CheckoutButtons />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const useFetchCartItems = () => {
	const {cartId} = useCart();
	const [items, setItems] = useState<ICartItem[]|undefined>();
	const [isLoading, setIsLoading] = useState(false);

	const fetchCartItems = useCallback(() => {
		if (!cartId) {
			throw new Error('Attempt to fetch with empty cartId. If it is loaded?');
		}

		setIsLoading(true);
		apiClient.cart.getCartItems(cartId)
			.then(({cart, items}) => {
				setItems(items);
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	}, [cartId]);

	useEffect(() => {
		if (cartId && !items) {
			fetchCartItems();
		}
	}, [cartId]);//eslint-disable-line

	return {
		items,
		setItems,
		isLoading,
		fetchCartItems
	};
};
