import Link from 'next/link';
import {ICartItem,TThumbRatio} from 'boundless-api-client';
import {useFormatCurrency,IBasicSettings,NoImage,ImgThumb} from 'boundless-commerce-components';

import {apiClient} from '@/lib/api';
import currency from 'currency.js';
import styles from './cartItems.module.css';
import clsx from 'clsx';

export default function CartRow({item, rmItem, onQtyChange, settings}: ICartRowProps) {
	const {product, image, variant} = item.vwItem;
	const {formatCurrency} = useFormatCurrency({settings});
	const productUrl = `/products/${product.url_key || product.product_id}`;

	return (
		<div className={clsx('row align-items-center py-3 border-bottom', styles.itemRow)}>
			<div className='col-md-4 d-flex align-items-center'>
				<Link href={productUrl} className={styles.imgLink}>
					{image
						? <ImgThumb image={image} maxSize={80} apiClient={apiClient}/>
						: <NoImage ratio={TThumbRatio['1-1']} xs/>
					}
				</Link>
				<div className='ms-3 flex-grow-1'>
					<div className='fw-bold'>
						<Link href={productUrl} className="text-decoration-none">
							{product?.title || ''}
						</Link>
					</div>
					{item.vwItem.type === 'variant' && (
						<div className='text-muted small'>{variant?.title || ''}</div>
					)}
					<div className='text-muted small'>
						SKU: {product?.sku || 'N/A'}
					</div>
				</div>
			</div>
			
			<div className='col-md-2 text-center'>
				<div className='d-md-none text-muted small mb-1'>Prix unitaire</div>
				{item.itemPrice.final_price && (
					<span className='fw-bold text-primary'>
						{formatCurrency(item.itemPrice.final_price)}
					</span>
				)}
			</div>
			
			<div className='col-md-3 text-center'>
				<div className='d-md-none text-muted small mb-2'>Quantité</div>
				<div className='d-flex align-items-center justify-content-center'>
					<button 
						className='btn btn-outline-secondary btn-sm'
						disabled={item.qty <= 1}
						onClick={() => onQtyChange(item.qty - 1)}
						style={{width: '32px', height: '32px'}}
					>
						<i className='bi bi-dash'></i>
					</button>
					<input
						type='number'
						min='1'
						value={item.qty}
						onChange={(e) => onQtyChange(parseInt(e.target.value) || 1)}
						className='form-control form-control-sm text-center mx-2'
						style={{width: '60px'}}
					/>
					<button 
						className='btn btn-outline-secondary btn-sm'
						onClick={() => onQtyChange(item.qty + 1)}
						style={{width: '32px', height: '32px'}}
					>
						<i className='bi bi-plus'></i>
					</button>
				</div>
			</div>
			
			<div className='col-md-2 text-center'>
				<div className='d-md-none text-muted small mb-1'>Total</div>
				{item.itemPrice.final_price && (
					<span className='fw-bold fs-5 text-success'>
						{formatCurrency(currency(item.itemPrice.final_price).multiply(item.qty * 1).toString())}
					</span>
				)}
			</div>
			
			<div className='col-md-1 text-center'>
				<button 
					className='btn btn-outline-danger btn-sm'
					onClick={rmItem}
					title='Supprimer du panier'
				>
					<i className='bi bi-trash'></i>
				</button>
			</div>
		</div>
	);
}

interface ICartRowProps {
	item: ICartItem;
	rmItem: () => void;
	onQtyChange: (qty: number) => void;
	settings: IBasicSettings;
}
