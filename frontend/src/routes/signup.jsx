import { useState, useCallback, useRef } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
//import i18next from 'i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';

import i18 from '../asserts/i18';

import useAuth from '../hooks';
import OverlayWrong from '../components/overlays/overlayWrong';
//import resources from '../locales/index';


/*const i18Instance = i18next.createInstance();

i18Instance.init({
	lng: 'ru',
	resources,
});*/

const validationSchema = yup.object({
  username: yup
    .string()
    .min(5, i18.t('errors.username.length'))
		.max(20, i18.t('errors.username.maxLength'))
    .required(i18.t('errors.username.required')),
  password: yup
    .string()
    .min(6, i18.t('errors.password.length'))
		.matches(/[0-9]/, i18.t('errors.password.number'))
    .matches(/[a-z]/, i18.t('errors.password.lowerCaseLetter')),
    /*.matches(/[A-Z]/, i18Instance.t('errors.password.upperCaseLetter'))
    .required(i18Instance.t('errors.password.required')),*/
});

const SignUp = () => {
	const navigate = useNavigate();

	const { logIn } = useAuth();

	const usernameRef = useRef();

	const passwordRef = useRef();

	const confirmPasswordRef = useRef();

	const [showErrorOverlay, setShowErrorOverlay] = useState(false);

	const [overlayRef, setOverlayRef] = useState(usernameRef);

	const [overlayText, setOverlayText] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
			confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
			const { 
				username,
				password,
				confirmPassword
			} = values;
			if (password !== confirmPassword) {
				setOverlayRef(confirmPasswordRef);
				setOverlayText(i18.t('errors.authorization.confirmPassword'));
				const className = cn('form-control', 'is-invalid');
				passwordRef.current.className = className;
				confirmPasswordRef.current.className = className;
				setShowErrorOverlay(!showErrorOverlay);
			} else {
				const response = await axios.post('/api/v1/signup', { username, password }).catch((error) => {
					if (error.response.status === 409) {
						setOverlayRef(confirmPasswordRef);
						setOverlayText(i18.t('errors.authorization.userExist'));
						const className = cn('form-control', 'is-invalid');
						usernameRef.current.className = className;
						passwordRef.current.className = className;
						confirmPasswordRef.current.className = className;
						setShowErrorOverlay(!showErrorOverlay);
					}
				});
				localStorage.setItem('userId', JSON.stringify(response.data));
				logIn();
				navigate('/');
			}
			/*const response = await axios.post('/api/v1/login', { username: values.username, password: values.password }).catch((error) => {
				const className = cn('form-control', 'is-invalid');
				usernameRef.current.className = className;
				passwordRef.current.className = className;
				setShowErrorOverlay(!showErrorOverlay);
			});*/
			//409 пользователь существует
			/*const response = await axios.post('/api/v1/signup', { username, password });
			setShowErrorOverlay(!showErrorOverlay);
			localStorage.setItem('userId', JSON.stringify(response.data));
			logIn();
			navigate('/');*/
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

	//const [username, setusername] = useState('');
	//const [password, setPassword] = useState('');
	//const shouldRedirect = false;
	//axios.post('/api/v1/signup', { username: 'newuser', password: '123456' });

	/*const createNewUser = async (e) => {
		e.preventDefault();
		console.log('test');
		//await axios.post('/api/v1/signup', { username: 'newuser', password: '123456' })
		console.log('username', username);
		console.log('password', password);
		const response = await axios.post('/api/v1/signup', { username, password });
		//response.then((data) => console.log(data.status));
		setusername('');
		setPassword('');
	}*/

	return (
		<div className="container-fluid h-100">
			<div className="row justify-content-center align-content-center h-100">
				<div className="col-12 col-md-8 col-xxl-6">
					<div className="card shadow-sm">
						<div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
							<div><img src="static/media/registration_img.jpg" className="rounded-circle" alt="Регистрация" /></div>
							<form onSubmit={formik.handleSubmit} className="w-50">
								<h1 className="text-center mb-4">Регистрация</h1>
								<div className="form-floating mb-3">
									<input 
										onChange={(e) => setInputValue("username", e.target.value)}
										placeholder="От 3 до 20 символов"
										name="username"
										autoComplete="username"
										required
										id="username"
										className="form-control"
										defaultValue=""
										ref={usernameRef}
									/>
									<label className="form-label" htmlFor="username">Имя пользователя</label>
									<small className="text-danger">{formik.touched.username && formik.errors.username}</small>
								</div>
								<div className="form-floating mb-3">
									<input
										onChange={(e) => setInputValue("password", e.target.value)}
										placeholder="Не менее 6 символов"
										name="password"
										aria-describedby="passwordHelpBlock"
										required
										autoComplete="new-password"
										type="password"
										id="password"
										className="form-control"
										defaultValue=""
										ref={passwordRef}
									/>
									<label className="form-label" htmlFor="password">Пароль</label>
									<small className="text-danger">{formik.touched.password && formik.errors.password}</small>
								</div>
								<div className="form-floating mb-4">
									<input
										onChange={(e) => setInputValue("confirmPassword", e.target.value)}
										placeholder="Пароли должны совпадать"
										name="confirmPassword"
										required
										autoComplete="new-password"
										type="password"
										id="confirmPassword"
										className="form-control"
										defaultValue=""
										ref={confirmPasswordRef}
									/>
									<label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
								</div>
								<button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
								<OverlayWrong overlayRef={overlayRef} show={showErrorOverlay} overlayText={overlayText}/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default SignUp;