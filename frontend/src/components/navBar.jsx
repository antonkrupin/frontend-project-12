import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import i18n from '../asserts/i18';
import AuthButton from './buttons/AuthButton';

const NavBar = () => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Navbar.Brand as={Link} to="/">{i18n.t('ui.chatName')}</Navbar.Brand>
        <AuthButton />
      </div>
    </nav>
  )
};

export default NavBar;
