import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import useAuth from '../../hooks/index'

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn && <Button onClick={auth.logOut}>{i18n.t('ui.buttons.logout')}</Button>
  );
};

export default AuthButton;
