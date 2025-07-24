'use client';

import {IAddToCartResponse} from 'boundless-api-client';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function SelectVariantDialog({open, onClose, neededSelectVariant}: IProps) {
	if (neededSelectVariant) {
		console.log(neededSelectVariant);
	}

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>Veuillez sélectionner une variante</DialogTitle>
			<DialogContent>
				<p>Non implémenté. Ce scénario n'est pas censé se produire dans ce modèle.</p>
			</DialogContent>
		</Dialog>
	);
}

interface IProps {
	open: boolean,
	onClose: () => void,
	neededSelectVariant?: IAddToCartResponse
}
