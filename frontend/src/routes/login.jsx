import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import resources from '../locales/index';
import '../styles/login.css'

const i18Instance = i18next.createInstance();

i18Instance.init({
	lng: 'ru',
	resources,
});

const validationSchema = yup.object({
  userName: yup
    .string()
    .min(5, i18Instance.t('errors.userName.length'))
    .required(i18Instance.t('errors.userName.required')),
  password: yup
    .string()
    .min(5, i18Instance.t('errors.password.length')),
		/* .matches(/[0-9]/, i18Instance.t('errors.password.number'))
    .matches(/[a-z]/, i18Instance.t('errors.password.lowerCaseLetter'))
    .matches(/[A-Z]/, i18Instance.t('errors.password.upperCaseLetter'))
    .matches(/[^\w]/, 'Password requires a symbol')
    .required(i18Instance.t('errors.password.required')), */
});

const isUserExist = (username, password) => {
	axios.post('/api/v1/login', { username: username, password: password }).then((response) => {
		localStorage.setItem('token', response.data.token);
		localStorage.setItem('userame', response.data.username);
		this.setState({ isLogged: true });
		return [true, response.data] // => { token: ..., username: 'admin' }
	}).catch((error) => {
		console.log([false, error]);
	})
}

const Login = () => {
	/* const state = {
		isLogged: false,
	} */
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
			isUserExist(values.userName, values.password)
    },
  });

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  return (
    <div className="main">
      <div className="wrapper">
        <div className="test">
					<div className="image">
						image
					</div>
					<div className="form" onSubmit={formik.handleSubmit}>
						<h1 className="text-center mb-5">Войти</h1>
						<form id="userForm" onSubmit={formik.handleSubmit}>
							<input
								className="form-control mb-3"
								id="userName"
								name="userName"
								type="text"
								placeholder="Имя пользователя"
								onChange={(e) => setInputValue("userName", e.target.value)}
							/>
							<div className="error text-danger text-center">
								<small>{formik.touched.userName && formik.errors.userName}</small>
							</div>
							<input
								className="form-control mb-3"
								id="password"
								name="password"
								type="text"
								placeholder="Пароль"
								onChange={(e) => setInputValue("password", e.target.value)}
							/>
							<div className="error text-danger text-center">
								<small>{formik.touched.password && formik.errors.password}</small>
							</div>
							<button className="btn btn-outline-primary w-100" type="submit">Войти</button>
						</form>
					</div>
				</div>
				<div className="test1">
					<Link to="/">Регистрация</Link>
				</div>
      </div>
    </div>
  );
}

export default Login;