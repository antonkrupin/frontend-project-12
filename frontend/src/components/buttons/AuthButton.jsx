import { useLocation, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import useAuth from '../../hooks/index'

const AuthButton = () => {
  const auth = useAuth();
  //const location = useLocation();

  return (
    auth.loggedIn && <Button onClick={auth.logOut}>{i18n.t('ui.buttons.logout')}</Button>
  );
};

export default AuthButton;
/*

: <Button as={Link} to="/login" state={{ from: location }}>{i18n.t('ui.buttons.login')}</Button>

*/