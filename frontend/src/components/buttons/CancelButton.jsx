import React from 'react';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';

const CancelButton = (props) => {
  const { onClick } = props;

  const buttonText = i18n.t('ui.buttons.cancel');

  return (
    <Button variant="secondary" onClick={onClick}>
      { buttonText }
    </Button>
  );
};

export default CancelButton;
