import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../styles/login.css'

const validationSchema = yup.object({
  userName: yup
    .string('Enter user name')
    .min(5, 'User name should be on minimum 5 characters length')
    .required('User name is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be on minimum 8 characters length')
    .required('Password is required'),
})

const Login = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
            <small>{formik.touched.userName && formik.errors.userName}</small>
            <input
              className="form-control mb-3"
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={(e) => setInputValue("password", e.target.value)}
            />
            <small>{formik.touched.password && formik.errors.password}</small>
            <button className="btn btn-outline-primary w-100" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;