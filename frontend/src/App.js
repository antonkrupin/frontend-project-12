import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Login from './routes/login';
import SignUp from './routes/signup';
import Page404 from './routes/page404';
import Chat from './routes/chat';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

import './App.css';


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
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

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};


const App = (props) => (
	<AuthProvider>
		<BrowserRouter>
			<Navbar bg="light" expand="lg">
				<Navbar.Brand as={Link} to="/">Chat page</Navbar.Brand>
				<AuthButton />
			</Navbar>
			<Routes>
				<Route
					path="/"
					element={(
						<PrivateRoute>
							<Chat socket={props.socket}/>
						</PrivateRoute>
					)}
				/>
				<Route path="login" element={<Login />} />
				<Route path="*" element={<Page404 />} />
				<Route path="signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	</AuthProvider>
);

export default App;