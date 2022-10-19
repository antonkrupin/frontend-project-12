import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import i18next from 'i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Form, Button, Overlay } from 'react-bootstrap';
import cn from 'classnames';

import i18 from '../assets/i18';

import useAuth from '../hooks';
import OverlayWrong from '../components/overlays/overlayWrong';
//import resources from '../locales/index';

import '../styles/login.css'


/*const i18Instance = i18next.createInstance();

i18Instance.init({
	lng: 'ru',
	resources,
});*/

const validationSchema = yup.object({
  username: yup
    .string()
		.required(i18.t('errors.username.required')),
  password: yup
    .string()
		.required(i18.t('errors.password.required')),
});

const Login = () => {
	const navigate = useNavigate();

	const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
			const response = await axios.post('/api/v1/login', { username: values.username, password: values.password }).catch((error) => {
				const className = cn('form-control', 'is-invalid');
				userNameRef.current.className = className;
				passwordRef.current.className = className;
				setShowErrorOverlay(!showErrorOverlay);
			});
			localStorage.setItem('userId', JSON.stringify(response.data));
			logIn();
			navigate('/');
    },
  });

	const [showErrorOverlay, setShowErrorOverlay] = useState(false);

	const userNameRef = useRef();

	const passwordRef = useRef();

	useEffect(() => {
		userNameRef.current.focus();
	}, [])

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

	return (
		<div className="container-fluid h-100">
			<div className="row justify-content-center align-content-center h-100">
				<div className="col-12 col-md-8 col-xxl-6">
					<div className="card shadow-sm">
						<div className="card-body row p-5">
								<div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
									<img src="/static/media/signup_img.jpg" alt="Логин"/>
								</div>
								<form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
									<h1 className="text-center mb-4">Войти</h1>
									<div className="form-floating mb-3">
										<input
											onChange={(e) => setInputValue("username", e.target.value)}
											name="username"
											autoComplete="username"
											required
											placeholder="Ваш ник"
											id="username"
											className="form-control"
											defaultValue=""
											ref={userNameRef}
										/>
											<label htmlFor="username">Ваш ник</label>
											<small className="text-danger">{formik.touched.username && formik.errors.username}</small>
									</div>
									<div className="form-floating mb-4">
										<input
											onChange={(e) => setInputValue("password", e.target.value)}
											name="password"
											autoComplete="current-password"
											required
											placeholder="Пароль"
											type="password"
											id="password"
											className="form-control"
											defaultValue=""
											ref={passwordRef}
										/>
											<label className="form-label" htmlFor="password">Пароль</label>
											<small className="text-danger">{formik.touched.password && formik.errors.password}</small>
									</div>
									<button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
								</form>
								<OverlayWrong overlayRef={passwordRef} show={showErrorOverlay} overlayText={i18.t('errors.authorization.wrong')}/>
						</div>
						<div className="card-footer p-4">
							<div className="text-center">
								<span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;