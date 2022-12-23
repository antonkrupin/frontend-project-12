import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import i18 from '../asserts/i18';
// import changeClassName from '../asserts/classNames';
import useAuth from '../hooks';
import routes from './routes';

import ErrorOverlay from '../components/errors/ErrorOverlay';
import Button from '../components/buttons/Button';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, i18.t('errors.username.length'))
    .max(20, i18.t('errors.username.maxLength'))
    .required(i18.t('errors.username.required')),
  password: yup
    .string()
    .min(6, i18.t('errors.password.length'))
    .required(i18.t('errors.username.required')),
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
        // passwordRef.current.className = changeClassName('form-control', 'is-invalid');
        // confirmPasswordRef.current.className = changeClassName('form-control', 'is-invalid');
        setShowErrorOverlay(true);
      } else {
        setStatus('registration');
        await axios.post(routes.signUpPath(), { username, password })
          .then((data) => {
            logIn(data.data);
            // navigate('/');
            navigate(routes.mainPagePath());
            setError(null);
            setStatus('registred');
          })
          .catch((err) => {
            setOverlayRef(confirmPasswordRef);
            setShowErrorOverlay(true);
            // usernameRef.current.className = changeClassName('form-control', 'is-invalid');
            // passwordRef.current.className = changeClassName('form-control', 'is-invalid');
            // confirmPasswordRef.current.className = changeClassName('form-control', 'is-invalid');
            switch (err.code) {
              case 'ERR_BAD_REQUEST': {
                setError(i18.t('errors.authorization.userExist'));
                setStatus('nonRegistred');
                break;
              }
              case 'ERR_NETWORK': {
                setError(i18.t('errors.session.network'));
                setStatus('nonRegistred');
                break;
              }
              default: {
                throw new Error(err);
              }
            }
            setTimeout(() => {
              setError(null);
              setShowErrorOverlay(false);
            }, '3000');
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    disabled={status === 'registration'}
                    id="username"
                    className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control'}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={i18.t('ui.signupForm.name')}
                    ref={usernameRef}
                  />
                  <label className="form-label" htmlFor="username">{i18.t('ui.signupForm.name')}</label>
                  <small className="text-danger">{formik.touched.username && formik.errors.username}</small>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    disabled={status === 'registration'}
                    id="password"
                    className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    placeholder={i18.t('ui.signupForm.password')}
                    type="password"
                    ref={passwordRef}
                  />
                  <label className="form-label" htmlFor="password">{i18.t('ui.signupForm.password')}</label>
                  <small className="text-danger">{formik.touched.password && formik.errors.password}</small>
                </div>
                <div className="form-floating mb-4">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.confirmPassword}
                    disabled={status === 'registration'}
                    id="confirmPassword"
                    className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    placeholder={i18.t('ui.signupForm.confirmPassword')}
                    type="password"
                    ref={confirmPasswordRef}
                  />
                  <label className="form-label" htmlFor="confirmPassword">{i18.t('ui.signupForm.confirmPassword')}</label>
                  <small className="text-danger">{formik.touched.confirmPassword && formik.errors.confirmPassword}</small>
                </div>
                {status === 'registration'
                  ? <Button text={i18.t('ui.signupForm.buttonClicked')} disabled wide outline />
                  : <Button text={i18.t('ui.signupForm.button')} wide outline />}
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
