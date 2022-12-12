import React from 'react';

import i18 from '../../asserts/i18';

const AuthButton = (props) => {
  const { status } = props;
  switch (status) {
    case 'nonAuthorized': {
      return (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          {i18.t('ui.loginForm.button')}
        </button>
      );
    }
    case 'authorization': {
      return (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          {i18.t('ui.loginForm.buttonClicked')}
        </button>
      );
    }
    case 'nonRegistred': {
      return (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          {i18.t('ui.signupForm.button')}
        </button>
      );
    }
    case 'registration': {
      return (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          {i18.t('ui.signupForm.buttonClicked')}
        </button>
      );
    }
    default: {
      throw new Error('Unexpected status');
    }
  }
};

export default AuthButton;
