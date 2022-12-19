import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { setModalShow } from '../../slices/modalsReducer';

const CancelButton = () => {
  const dispatch = useDispatch();

  const buttonText = i18n.t('ui.buttons.cancel');

  return (
    <Button variant="secondary" onClick={() => dispatch(setModalShow())}>
      { buttonText }
    </Button>
  );
};

export default CancelButton;
