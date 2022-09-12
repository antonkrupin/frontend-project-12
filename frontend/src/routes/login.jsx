import React from 'react';
import { useFormik } from 'formik';
import '../styles/login.css'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="main">
      <div className="wrapper">
        <div className="image">
          image
        </div>
        <div className="form">
          <h1 class="text-center mb-5">Войти</h1>
          <form id="userForm" onSubmit={formik.handleSubmit}>
            <input
              className="form-control mb-3"
              id="userName"
              name="userName"
              type="text"
              placeholder="Имя пользователя"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <input
              className="form-control mb-3"
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <button className="btn btn-outline-primary w-100" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;