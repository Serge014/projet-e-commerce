import {ICategory} from 'boundless-api-client';
import {apiClient, revalidate} from '@/lib/api';
import Link from 'next/link';

export default async function CategoriesMenu() {
	const categories = await fetchCategoriesMenu();

	return (
		<section className="py-4 bg-light">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12">
						<h2 className="text-center mb-4 text-gradient fw-bold">
							<i className="bi bi-grid-3x3-gap me-2"></i>
							Nos Catégories
						</h2>
					</div>
				</div>
				<div className="row g-3 justify-content-center">
					{categories.map(({category_id, title, url_key}) => (
						<div key={category_id} className="col-6 col-md-3 col-lg-2">
							<Link 
								href={`/collections/${url_key || category_id}`} 
								className="text-decoration-none"
							>
								<div className="card h-100 border-0 shadow-sm hover-card text-center p-3">
									<div className="card-body d-flex flex-column align-items-center justify-content-center">
										<div className="category-icon mb-3">
											{getCategoryIcon(title)}
										</div>
										<h6 className="card-title mb-0 text-dark fw-semibold">
											{title}
										</h6>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

const getCategoryIcon = (title: string) => {
	const iconMap: { [key: string]: string } = {
		'Électronique': 'bi-phone',
		'Vêtements': 'bi-tshirt',
		/*'Livres': 'bi-book',
		'Sport': 'bi-trophy',
		'Maison': 'bi-house',
		'Beauté': 'bi-heart',
		'Jouets': 'bi-controller',
		'Automobile': 'bi-car-front'*/
	};

	const iconClass = iconMap[title] || 'bi-tag';
	return <i className={`bi ${iconClass} fs-1 text-primary`}></i>;
};

const fetchCategoriesMenu = async (): Promise<ICategory[]> => {
	// Données de démonstration pour contourner l'authentification
	const demoCategories: ICategory[] = [
		{
			category_id: 1,
			title: 'Électronique',
			url_key: 'electronique',
			parent_id: null,
			children: [],
			image: null,
			tree_sort: '1',
			level: 1,
			custom_link: null
		},
		{
			category_id: 2,
			title: 'Vêtements',
			url_key: 'vetements',
			parent_id: null,
			children: [],
			image: null,
			tree_sort: '2',
			level: 1,
			custom_link: null
		},/*
		{
			category_id: 3,
			title: 'Livres',
			url_key: 'livres',
			parent_id: null,
			children: [],
			image: null,
			tree_sort: '3',
			level: 1,
			custom_link: null
		},
		{
			category_id: 4,
			title: 'Sport',
			url_key: 'sport',
			parent_id: null,
			children: [],
			image: null,
			tree_sort: '4',
			level: 1,
			custom_link: null
		},
		{
			category_id: 5,
			title: 'Maison',
			url_key: 'maison',
			parent_id: null,
			children: [],
			image: null,
			tree_sort: '5',
			level: 1,
			custom_link: null
		},
		{
			category_id: 6,
			title: 'Beauté',
			url_key: 'beaute',
			parent_id: null,
			children: [],
			image: null,
			tree_sort: '6',
			level: 1,
			custom_link: null
		}*/
	];

	return demoCategories;
};
