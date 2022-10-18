import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import i18next from 'i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import useAuth from '../hooks';
import { Form, Button, Overlay } from 'react-bootstrap';

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
		/*.matches(/[0-9]/, i18Instance.t('errors.password.number'))
    .matches(/[a-z]/, i18Instance.t('errors.password.lowerCaseLetter'))
    .matches(/[A-Z]/, i18Instance.t('errors.password.upperCaseLetter'))
    .matches(/[^\w]/, 'Password requires a symbol')
    .required(i18Instance.t('errors.password.required')),*/
});

const Login = () => {
	const navigate = useNavigate();
	const { logIn } = useAuth();

	const [alert, setAlert] = useState('')

  const formik = useFormik({
    initialValues: {
      userName: 'text',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
			const response = await axios.post('/api/v1/login', { username: values.userName, password: values.password }).catch((error) => {
				console.log(error);
				setAlert('Неверные имя пользователя или пароль');
				setShow(!show);
			});
			localStorage.setItem('userId', JSON.stringify(response.data));
			logIn();
			navigate('/');
    },
  });

	const [show, setShow] = useState(false);
  const target = useRef(null);

	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
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
								<Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
									<h1 className="text-center mb-4">Войти</h1>
									<div className="form-floating mb-3">
										<input
											onChange={(e) => setInputValue("userName", e.target.value)}
											name="username"
											autoComplete="username"
											required=""
											placeholder="Ваш ник"
											id="username"
											className="form-control"
											defaultValue=""
											ref={inputRef}
										/>
											<label htmlFor="username">Ваш ник</label>
									</div>
									<div className="form-floating mb-4">
										<input
											onChange={(e) => setInputValue("password", e.target.value)}
											name="password"
											autoComplete="current-password"
											required=""
											placeholder="Пароль"
											type="password"
											id="password"
											className="form-control"
											defaultValue=""
										/>
											<label className="form-label" htmlFor="password">Пароль</label>
									</div>
									<button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
								</Form>
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

	/*return (
		<div className="main">
			<Form className="loginForm" onSubmit={formik.handleSubmit} >
				<Overlay target={target.current} show={show} placement="bottom">
					{({ placement, arrowProps, show: _show, popper, ...props }) => (
						<div
							{...props}
							style={{
								position: 'absolute',
								left: '-100px',
								backgroundColor: 'rgba(255, 100, 100, 0.95)',
								padding: '2px 10px',
								color: 'white',
								borderRadius: 3,
								...props.style,
							}}
						>
							{alert}
						</div>
					)}
				</Overlay>
				<Form.Group className="mb-3" controlId="userName">
					<Form.Control 
						type="text" 
						placeholder={"Введите имя пользователя"} 
						name="userName" 
						onChange={(e) => setInputValue("userName", e.target.value)} 
						required
						ref={inputRef}
					/>
					<div className="error text-danger text-center">
						<small>{formik.touched.userName && formik.errors.userName}</small>
					</div>
				</Form.Group>
				<Form.Group className="mb-3" controlId="password" >
					<Form.Control type="text" placeholder="Введите пароль" name="password" onChange={(e) => setInputValue("password", e.target.value)} required />
					<div className="error text-danger text-center">
						<small>{formik.touched.password && formik.errors.password}</small>
					</div>
				</Form.Group>
				<Button className="w-100" variant="primary" type="submit">
					Войти
				</Button>
			</Form>
			<Link to="/signup">Регистрация</Link>
		</div>
	)*/

  /*return (
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
  );*/
}

export default Login;