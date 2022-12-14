import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../hooks';
import i18n from '../asserts/i18';
import routes from '../routes/routes';

import LogOutButton from './buttons/LogOutButton';

const NavBar = () => {
  const { status } = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Navbar.Brand
          as={Link}
          to={(status !== 'authorization' && status !== 'registration')
            ? routes.mainPagePath() : routes.emptyPath()}
        >
          {i18n.t('ui.chatName')}
        </Navbar.Brand>
        <LogOutButton />
      </div>
    </nav>
  );
};

export default NavBar;
