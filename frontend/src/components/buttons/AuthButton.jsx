import React from 'react';
import { useLocation } from 'react-router-dom';

import useAuth from '../../hooks';

import i18 from '../../asserts/i18';

const AuthButton = () => {
  const { pathname } = useLocation();

  const auth = useAuth();

  switch (pathname) {
    case '/login': {
      return auth.status === 'authorization' ? (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          {i18.t('ui.loginForm.buttonClicked')}
        </button>
      ) : (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          {i18.t('ui.loginForm.button')}
        </button>
      );
    }
    case '/signup': {
      return auth.status === 'registration' ? (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          {i18.t('ui.signupForm.buttonClicked')}
        </button>
      ) : (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          {i18.t('ui.signupForm.button')}
        </button>
      );
    }
    default: {
      throw new Error('Unexpected location pathname');
    }
  }
};

export default AuthButton;
