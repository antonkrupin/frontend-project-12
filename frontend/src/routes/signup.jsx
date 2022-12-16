import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import i18 from '../asserts/i18';
import changeClassName from '../asserts/classNames';
import useAuth from '../hooks';
import routes from './routes';

import ErrorOverlay from '../components/errors/ErrorOverlay';
import AuthButton from '../components/buttons/AuthButton';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, i18.t('errors.username.length'))
    .max(20, i18.t('errors.username.maxLength'))
    .required(i18.t('errors.username.required')),
  password: yup
    .string()
    .min(6, i18.t('errors.password.length')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], i18.t('errors.authorization.confirmPassword')),
});

const SignUp = () => {
  const navigate = useNavigate();

  const { logIn, setStatus, status } = useAuth();

  const usernameRef = useRef();

  const passwordRef = useRef();

  const confirmPasswordRef = useRef();

  const [showErrorOverlay, setShowErrorOverlay] = useState(false);

  const [overlayRef, setOverlayRef] = useState(usernameRef);

  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      isEqual: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const {
        username,
        password,
        confirmPassword,
      } = values;
      if (password !== confirmPassword) {
        setOverlayRef(confirmPasswordRef);
        setError(i18.t('errors.authorization.confirmPassword'));
        passwordRef.current.className = changeClassName('form-control', 'is-invalid');
        confirmPasswordRef.current.className = changeClassName('form-control', 'is-invalid');
        setShowErrorOverlay(!showErrorOverlay);
      } else {
        setStatus('registration');
        await axios.post(routes.signUpPath(), { username, password })
          .then((data) => {
            logIn(data.data);
            navigate('/');
            setError(null);
            setStatus('registred');
          })
          .catch(() => {
            setOverlayRef(confirmPasswordRef);
            setError(i18.t('errors.authorization.userExist'));
            usernameRef.current.className = changeClassName('form-control', 'is-invalid');
            passwordRef.current.className = changeClassName('form-control', 'is-invalid');
            confirmPasswordRef.current.className = changeClassName('form-control', 'is-invalid');
            setShowErrorOverlay(!showErrorOverlay);
            setStatus('nonRegistred');
          });
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src="static/media/registration_img.jpg" className="rounded-circle" alt="Регистрация" /></div>
              <form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{i18.t('ui.signupForm.title')}</h1>
                <div className="form-floating mb-3">
                  <input
                    disabled={status === 'registration'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    className="form-control disabled"
                    ref={usernameRef}
                  />
                  <label className="form-label" htmlFor="username">{i18.t('ui.signupForm.name')}</label>
                  <small className="text-danger">{formik.touched.username && formik.errors.username}</small>
                </div>
                <div className="form-floating mb-3">
                  <input
                    disabled={status === 'registration'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className="form-control"
                    ref={passwordRef}
                  />
                  <label className="form-label" htmlFor="password">{i18.t('ui.signupForm.password')}</label>
                  <small className="text-danger">{formik.touched.password && formik.errors.password}</small>
                </div>
                <div className="form-floating mb-4">
                  <input
                    disabled={status === 'registration'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.confirmPassword}
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    ref={confirmPasswordRef}
                  />
                  <label className="form-label" htmlFor="confirmPassword">{i18.t('ui.signupForm.confirmPassword')}</label>
                  <small className="text-danger">{formik.touched.confirmPassword && formik.errors.confirmPassword}</small>
                </div>
                <AuthButton />
                <ErrorOverlay
                  overlayRef={overlayRef}
                  show={showErrorOverlay}
                  overlayText={error}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
