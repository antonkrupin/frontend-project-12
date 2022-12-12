import React, { useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import routes from './routes/routes';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';
import Login from './routes/login';
import SignUp from './routes/signup';
import Page404 from './routes/page404';
import Chat from './routes/chat';
import NavBar from './components/navBar';

import './App.css';

const AuthProvider = ({ children }) => {
  // initial value was changed from false to true;
  const [loggedIn, setLoggedIn] = useState(false);

  const [status, setStatus] = useState('nonAuthorized');

  const logIn = (token) => {
    localStorage.setItem('userId', JSON.stringify(token));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.clear();
    setLoggedIn(false);
  };

  const authProviderValue = useMemo(() => ({
    loggedIn, logIn, logOut, setStatus, status,
  }));

  return (
    <AuthContext.Provider value={authProviderValue}>
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
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.page404Path()} element={<Page404 />} />
        <Route path={routes.signUpPagePath()} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
