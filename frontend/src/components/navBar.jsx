import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../hooks';
import i18n from '../asserts/i18';
import LogOutButton from './buttons/LogOutButton';

const NavBar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Navbar.Brand as={Link} to={useAuth().status !== ('authorization' || 'registration') ? '/' : '#'}>{i18n.t('ui.chatName')}</Navbar.Brand>
      <LogOutButton />
    </div>
  </nav>
);

export default NavBar;

/*

<Link to={useAuth().status !== 'authorization' || 'registration' ? '/' : '#'}>
                    {i18.t('ui.loginForm.registration')}
                  </Link>
(useAuth().status !== 'registration') && (useAuth().status !== 'authorization')
*/
