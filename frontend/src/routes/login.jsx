import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

import i18 from '../asserts/i18';
import changeClassName from '../asserts/classNames';
import useAuth from '../hooks';

import { fetchStatus } from '../slices/selectors';
import { setStatus } from '../slices/statusReducer';
import ErrorOverlay from '../components/errors/ErrorOverlay';
import EnterButton from '../components/buttons/EnterButton';

const notify = (text) => {
  toast.error(text, {
    position: 'top-right',
    autoClose: 5000,
    theme: 'light',
  });
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required(i18.t('errors.username.required')),
  password: yup
    .string()
    .required(i18.t('errors.password.required')),
});

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { logIn } = useAuth();

  // const [status, setStatus] = useState(null);
  // const status = useSelector(fetchStatus);

  const [showErrorOverlay, setShowErrorOverlay] = useState(false);

  const userNameRef = useRef();

  const passwordRef = useRef();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setStatus('authorization'));
      await axios.post('/api/v1/login', { username: values.username, password: values.password }).then((data) => {
        localStorage.setItem('userId', JSON.stringify(data.data));
        logIn();
        navigate('/');
        dispatch(setStatus('authorized'));
      })
        .catch((error) => {
          if (error.message === 'Network Error') {
            notify(i18.t('ui.toasts.networkError'));
            dispatch(setStatus('networkError'));
          } else {
            userNameRef.current.className = changeClassName('form-control is-invalid');
            passwordRef.current.className = changeClassName('form-control is-invalid');
            setShowErrorOverlay(!showErrorOverlay);
            dispatch(setStatus(null));
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

  /* let buttonEnter;
  buttonEnter = (
    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
    {i18.t('ui.loginForm.button')}</button>
  );
  if (status === 'authorization') {
    buttonEnter = (
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        {i18.t('ui.loginForm.buttonClicked')}
      </button>
    );
  } */

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
                  <EnterButton />
                </form>
                <ErrorOverlay overlayRef={passwordRef} show={showErrorOverlay} overlayText={i18.t('errors.authorization.wrong')} />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {i18.t('ui.loginForm.newUser')}
                  </span>
                  <Link to={useSelector(fetchStatus) !== 'authorization' ? '/signup' : '#'}>
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
