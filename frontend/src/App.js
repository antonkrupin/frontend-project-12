import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Login from './routes/login';
import Page404 from './routes/page404';
import Main from './routes/main';
import './App.css';

const TestContext = React.createContext({});
export default class App extends React.Component {
  state = {
    userName: '',
    password: '',
    token: '',
  }

  render () {
    return (
      <div>
        <TestContext.Provider value = {this.state}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </TestContext.Provider>
      </div>
    );
  }
}

/*
<Route path="login" render={() => (
                this.state.isLogged ? (<Navigate replace to="/"/>) : (<Login/>))} />
<Route path="/" element={<Navigate replace to="/home" />} />
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>

*/