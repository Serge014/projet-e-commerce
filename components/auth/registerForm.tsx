'use client';

import {Form, Formik, FormikHelpers} from 'formik';
import {apiErrors2Formik, formikFieldAttrs} from '@/lib/formUtils';
import {useCallback} from 'react';
import {apiClient} from '@/lib/api';
import {useCustomer} from 'boundless-commerce-components/dist/client';
import Link from 'next/link';
import ErrorSummary from '@/components/errorSummary';

export default function RegisterForm() {
	const {onSubmit} = useSubmitRegisterForm();

	return (
		<div className="">
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-12">
					<div className="card border-0 shadow-sm">
						<div className="card-body p-5">
							<div className="text-center mb-4">
								<i className="bi bi-person-plus text-primary display-1"></i>
								<h2 className="fw-bold mt-3">Créer un compte</h2>
								<p className="text-muted">Rejoignez notre communauté</p>
							</div>

							<Formik
								initialValues={{email: '', password: '', re_password: '', first_name: '', last_name: '', receive_marketing_info: true}}
								onSubmit={onSubmit}
							>
								{(formikProps) => (
									<Form>
										<ErrorSummary />

										<div className="mb-4">
											<label htmlFor="email" className="form-label fw-bold">
												<i className="bi bi-envelope me-2 text-primary"></i>
												Adresse email *
											</label>
											<input
												type="email"
												className={`form-control form-control-lg ${formikProps.errors.email && formikProps.touched.email ? 'is-invalid' : ''}`}
												id="email"
												placeholder="votre@email.com"
												required
												{...formikFieldAttrs<IRegisterFormValues>('email', formikProps)}
											/>
											{formikProps.errors.email && formikProps.touched.email && (
												<div className="invalid-feedback">{formikProps.errors.email}</div>
											)}
										</div>

										<div className="row">
											<div className="col-md-6">
												<div className="mb-4">
													<label htmlFor="first_name" className="form-label fw-bold">
														<i className="bi bi-person me-2 text-primary"></i>
														Prénom
													</label>
													<input
														type="text"
														className={`form-control form-control-lg ${formikProps.errors.first_name && formikProps.touched.first_name ? 'is-invalid' : ''}`}
														id="first_name"
														placeholder="Votre prénom"
														{...formikFieldAttrs<IRegisterFormValues>('first_name', formikProps)}
													/>
													{formikProps.errors.first_name && formikProps.touched.first_name && (
														<div className="invalid-feedback">{formikProps.errors.first_name}</div>
													)}
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-4">
													<label htmlFor="last_name" className="form-label fw-bold">
														<i className="bi bi-person me-2 text-primary"></i>
														Nom
													</label>
													<input
														type="text"
														className={`form-control form-control-lg ${formikProps.errors.last_name && formikProps.touched.last_name ? 'is-invalid' : ''}`}
														id="last_name"
														placeholder="Votre nom"
														{...formikFieldAttrs<IRegisterFormValues>('last_name', formikProps)}
													/>
													{formikProps.errors.last_name && formikProps.touched.last_name && (
														<div className="invalid-feedback">{formikProps.errors.last_name}</div>
													)}
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-md-6">
												<div className="mb-4">
													<label htmlFor="password" className="form-label fw-bold">
														<i className="bi bi-lock me-2 text-primary"></i>
														Mot de passe *
													</label>
													<input
														type="password"
														className={`form-control form-control-lg ${formikProps.errors.password && formikProps.touched.password ? 'is-invalid' : ''}`}
														id="password"
														placeholder="Votre mot de passe"
														required
														{...formikFieldAttrs<IRegisterFormValues>('password', formikProps)}
													/>
													{formikProps.errors.password && formikProps.touched.password && (
														<div className="invalid-feedback">{formikProps.errors.password}</div>
													)}
												</div>
											</div>
											<div className="col-md-6">
												<div className="mb-4">
													<label htmlFor="re_password" className="form-label fw-bold">
														<i className="bi bi-lock me-2 text-primary"></i>
														Confirmer le mot de passe *
													</label>
													<input
														type="password"
														className={`form-control form-control-lg ${formikProps.errors.re_password && formikProps.touched.re_password ? 'is-invalid' : ''}`}
														id="re_password"
														placeholder="Confirmez votre mot de passe"
														required
														{...formikFieldAttrs<IRegisterFormValues>('re_password', formikProps)}
													/>
													{formikProps.errors.re_password && formikProps.touched.re_password && (
														<div className="invalid-feedback">{formikProps.errors.re_password}</div>
													)}
												</div>
											</div>
										</div>

										<div className="mb-4">
											<div className="form-check">
												<input
													className="form-check-input"
													type="checkbox"
													id="receive_marketing_info"
													checked={formikProps.values.receive_marketing_info}
													onChange={formikProps.handleChange}
												/>
												<label className="form-check-label" htmlFor="receive_marketing_info">
													<i className="bi bi-envelope-open me-2 text-primary"></i>
													Je souhaite recevoir les offres et nouveautés par email
												</label>
											</div>
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
														Création du compte...
													</>
												) : (
													<>
														<i className="bi bi-person-plus me-2"></i>
														Créer mon compte
													</>
												)}
											</button>
										</div>

										<div className="text-center">
											<p className="text-muted mb-0">
												Déjà un compte ?{' '}
												<Link href="/auth/login" className="text-decoration-none fw-bold text-primary">
													Se connecter
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

const useSubmitRegisterForm = () => {
	const {login} = useCustomer();

	const onSubmit = useCallback((values: IRegisterFormValues, {setSubmitting, setErrors}: FormikHelpers<IRegisterFormValues>) => {
		if (!login) {
			throw new Error('authCustomer is empty. Did you wrap the app in BoundlessCart?');
		}

		apiClient.customer.register({
			...values,
			send_welcome_email: true,
			login_url: `${window.location.origin}/auth/login`
		})
			.then(({authToken, customer}) => {
				login(authToken, customer);
			})
			.catch(({response: {data}}) => setErrors(apiErrors2Formik(data)))
			.finally(() => setSubmitting(false));
	}, [login]);

	return {
		onSubmit
	};
};

interface IRegisterFormValues {
	email: string;
	password: string;
	re_password: string;
	first_name: string;
	last_name: string;
	receive_marketing_info: boolean;
}
