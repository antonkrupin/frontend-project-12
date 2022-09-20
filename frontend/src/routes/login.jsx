import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import useAuth from '../hooks';
import { Alert } from 'react-bootstrap';

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

const Login = () => {
	const navigate = useNavigate();
	const { logIn } = useAuth();

	const [alert, setAlert] = useState('')

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
			const response = await axios.post('/api/v1/login', { username: values.userName, password: values.password }).catch((error) => {
				setAlert('the username or password is incorrect')
			});
			localStorage.setItem('userId', JSON.stringify(response.data));
			logIn();
			navigate('/');
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

	let alertBlock;

  if (alert !== '') {
    alertBlock = (
      <Alert variant="danger">
        {alert}
      </Alert>
    );
  }

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
							{alertBlock}
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