import React from 'react';
import { useSelector } from 'react-redux';

import i18 from '../../asserts/i18';

import { fetchStatus } from '../../slices/selectors';

const EnterButton = () => {
  const status = useSelector(fetchStatus);
  switch (status) {
    case 'authorization': {
      return (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          {i18.t('ui.loginForm.buttonClicked')}
        </button>
      );
    }
    default: {
      return (
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{i18.t('ui.loginForm.button')}</button>
      );
    }
  }
};

export default EnterButton;
