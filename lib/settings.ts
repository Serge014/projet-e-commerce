import {apiClient, revalidate} from '@/lib/api';
import {IBasicSettings} from 'boundless-commerce-components';

export const fetchBasicSettings = async (): Promise<IBasicSettings> => {
	// Paramètres de démonstration pour contourner l'authentification
	const demoSettings: IBasicSettings = {} as IBasicSettings;

	return demoSettings;
};
