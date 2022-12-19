/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';

import i18 from '../asserts/i18';
import changeClassName from '../asserts/classNames';
import useAuth from '../hooks';
import routes from './routes';

import ErrorOverlay from '../components/errors/ErrorOverlay';
import Button from '../components/buttons/Button';

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

  const { logIn, setStatus, status } = useAuth();

  const userNameRef = useRef();

  const passwordRef = useRef();

  const [showErrorOverlay, setShowErrorOverlay] = useState(false);

  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setStatus('authorization');
      await axios.post(routes.loginPath(), { username: values.username, password: values.password })
        .then((data) => {
          logIn(data.data);
          navigate('/');
          setError(null);
          setStatus('authorized');
        })
        .catch((err) => {
          userNameRef.current.className = changeClassName('form-control is-invalid');
          passwordRef.current.className = changeClassName('form-control is-invalid');
          setShowErrorOverlay(!showErrorOverlay);
          switch (err.code) {
            case 'ERR_BAD_REQUEST': {
              setError(i18.t('errors.authorization.wrong'));
              setStatus('nonAuthorized');
              break;
            }
            case 'ERR_NETWORK': {
              setError(i18.t('errors.session.network'));
              setStatus('nonAuthorized');
              break;
            }
            default: {
              throw new Error(err);
            }
          }
        });
    },
  });

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const setInputValue = useCallback(
    (key, value) => formik.setValues({
      ...formik.values,
      [key]: value,
    }),
    [formik],
  );

  return (
    <>
      <div className="container-fluid h-100 my-4 mt-4">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="/static/media/signup_img.jpg" alt="Логин" />
                </div>
                <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{i18.t('ui.loginForm.title')}</h1>
                  <div className="form-floating mb-3">
                    <input
                      disabled={status === 'authorization'}
                      onChange={(e) => setInputValue('username', e.target.value)}
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={i18.t('ui.loginForm.name')}
                      id="username"
                      className="form-control"
                      defaultValue=""
                      ref={userNameRef}
                    />
                    <label htmlFor="username">{i18.t('ui.loginForm.name')}</label>
                    <small className="text-danger">{formik.touched.username && formik.errors.username}</small>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      disabled={status === 'authorization'}
                      onChange={(e) => setInputValue('password', e.target.value)}
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder={i18.t('ui.loginForm.password')}
                      type="password"
                      id="password"
                      className="form-control"
                      defaultValue=""
                      ref={passwordRef}
                    />
                    <label className="form-label" htmlFor="password">{i18.t('ui.loginForm.password')}</label>
                    <small className="text-danger">{formik.touched.password && formik.errors.password}</small>
                  </div>
                  {status === 'authorization'
                    ? <Button text={i18.t('ui.loginForm.buttonClicked')} disabled wide outline />
                    : <Button text={i18.t('ui.loginForm.button')} wide outline />}
                </form>
                <ErrorOverlay
                  overlayRef={passwordRef}
                  show={showErrorOverlay}
                  overlayText={error}
                />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {i18.t('ui.loginForm.newUser')}
                  </span>
                  <Link to={useAuth().status !== 'authorization' ? '/signup' : '#'}>
                    {i18.t('ui.loginForm.registration')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
