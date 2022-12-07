import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import {
  loginPagePath,
  signUpPagePath,
  page404Path,
} from './routes/routes';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';
import Login from './routes/login';
import SignUp from './routes/signup';
import Page404 from './routes/page404';
import Chat from './routes/chat';
import NavBar from './components/navBar';

import './App.css';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (token) => {
    localStorage.setItem('userId', JSON.stringify(token));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )}
        />
        <Route path={loginPagePath} element={<Login />} />
        <Route path={page404Path} element={<Page404 />} />
        <Route path={signUpPagePath} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
