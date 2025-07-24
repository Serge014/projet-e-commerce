'use client';

import {Form, Formik, FormikHelpers} from 'formik';
import {apiErrors2Formik, formikFieldAttrs} from '@/lib/formUtils';
import {useCallback} from 'react';
import {apiClient} from '@/lib/api';
import {useCart, useCustomer} from 'boundless-commerce-components/dist/client';
import Link from 'next/link';

export default function LoginForm() {
	const {onSubmit} = useSubmitLoginForm();

	return (
		<div className="">
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-12">
					<div className="card border-0 shadow-sm">
						<div className="card-body p-5">
							<div className="text-center mb-4">
								<i className="bi bi-person-circle text-primary display-1"></i>
								<h2 className="fw-bold mt-3">Connexion</h2>
								<p className="text-muted">Connectez-vous à votre compte</p>
							</div>

							<Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit}>
								{(formikProps) => (
									<Form>
										<div className="mb-4">
											<label htmlFor="email" className="form-label fw-bold">
												<i className="bi bi-envelope me-2 text-primary"></i>
												Adresse email
											</label>
											<input
												type="email"
												className={`form-control form-control-lg ${formikProps.errors.email && formikProps.touched.email ? 'is-invalid' : ''}`}
												id="email"
												placeholder="votre@email.com"
												required
												{...formikFieldAttrs<ILoginFormValues>('email', formikProps)}
											/>
											{formikProps.errors.email && formikProps.touched.email && (
												<div className="invalid-feedback">{formikProps.errors.email}</div>
											)}
										</div>

										<div className="mb-4">
											<label htmlFor="password" className="form-label fw-bold">
												<i className="bi bi-lock me-2 text-primary"></i>
												Mot de passe
											</label>
											<input
												type="password"
												className={`form-control form-control-lg ${formikProps.errors.password && formikProps.touched.password ? 'is-invalid' : ''}`}
												id="password"
												placeholder="Votre mot de passe"
												required
												{...formikFieldAttrs<ILoginFormValues>('password', formikProps)}
											/>
											{formikProps.errors.password && formikProps.touched.password && (
												<div className="invalid-feedback">{formikProps.errors.password}</div>
											)}
										</div>

										<div className="mb-4 text-end">
											<Link href="/auth/restore-password" className="text-decoration-none text-primary">
												<i className="bi bi-question-circle me-1"></i>
												Mot de passe oublié ?
											</Link>
										</div>

										<div className="d-grid mb-4">
											<button
												type="submit"
												className="btn btn-primary btn-lg"
												disabled={formikProps.isSubmitting}
											>
												{formikProps.isSubmitting ? (
													<>
														<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
														Connexion en cours...
													</>
												) : (
													<>
														<i className="bi bi-box-arrow-in-right me-2"></i>
														Se connecter
													</>
												)}
											</button>
										</div>

										<div className="text-center">
											<p className="text-muted mb-0">
												Pas encore de compte ?{' '}
												<Link href="/auth/register" className="text-decoration-none fw-bold text-primary">
													Créer un compte
												</Link>
											</p>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const useSubmitLoginForm = () => {
	const {login} = useCustomer();
	const {setTotal, setCartId, cartId} = useCart();

	const onSubmit = useCallback((values: ILoginFormValues, {setSubmitting, setErrors}: FormikHelpers<ILoginFormValues>) => {
		if (!login) {
			throw new Error('authCustomer is empty. Did you wrap the app in BoundlessCart?');
		}

		apiClient.customer.login(values.email, values.password, cartId)
			.then(({authToken, customer, activeCart}) => {
				login(authToken, customer);

				if (activeCart && setCartId && setTotal) {
					setCartId(activeCart.id);
					setTotal(activeCart.total);
				}
			})
			.catch(({response: {data}}) => setErrors(apiErrors2Formik(data)))
			.finally(() => setSubmitting(false));
	}, [login, cartId, setCartId, setTotal]);

	return {
		onSubmit
	};
};

interface ILoginFormValues {
	email: string;
	password: string;
}
