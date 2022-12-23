/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useState, useRef, useEffect,
} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';

import i18 from '../asserts/i18';
// import changeClassName from '../asserts/classNames';
import useAuth from '../hooks';
import routes from './routes';

import ErrorOverlay from '../components/errors/ErrorOverlay';
import Button from '../components/buttons/Button';

const validationSchema = yup.object({
  username: yup
    .string(),
  // .required(i18.t('errors.username.required')),
  password: yup
    .string(),
  // .required(i18.t('errors.password.required')),
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
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const {
        username,
        password,
      } = values;
      setStatus('authorization');
      await axios.post(routes.loginPath(), { username, password })
        .then((data) => {
          logIn(data.data);
          navigate(routes.mainPagePath());
          setError(null);
          setStatus('authorized');
        })
        .catch((err) => {
          // userNameRef.current.className = changeClassName('form-control is-invalid');
          // passwordRef.current.className = changeClassName('form-control is-invalid');
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      disabled={status === 'authorization'}
                      id="username"
                      className={error ? 'form-control is-invalid' : 'form-control'}
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={i18.t('ui.loginForm.name')}
                      ref={userNameRef}
                    />
                    <label htmlFor="username">{i18.t('ui.loginForm.name')}</label>
                    <small className="text-danger">{formik.touched.username && formik.errors.username}</small>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      // onChange={(e) => setInputValue('password', e.target.value)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={status === 'authorization'}
                      id="password"
                      className={error ? 'form-control is-invalid' : 'form-control'}
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder={i18.t('ui.loginForm.password')}
                      type="password"
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
                  <Link to={useAuth().status !== 'authorization' ? routes.signUpPagePath() : routes.emptyPath()}>
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
