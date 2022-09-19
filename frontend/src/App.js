import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Login from './routes/login';
import Page404 from './routes/page404';
import Main from './routes/main';
import './App.css';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
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
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
	<AuthProvider>
		<div>
			<BrowserRouter>
				<Routes>
				<Route
            path="/"
            element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )}
          />
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Page404 />} />
				</Routes>
			</BrowserRouter>
		</div>
	</AuthProvider>
);

export default App;