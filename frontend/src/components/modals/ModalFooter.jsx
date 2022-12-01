import React from 'react';
import { Modal } from 'react-bootstrap';

import CancelButton from '../buttons/CancelButton';
import ModalButtons from '../buttons/ModalButtons';

const ModalFooter = (props) => {
  const {
    buttonText,
    buttonAdditionalText,
    buttonHandler,
    status,
  } = props;

  return (
    <Modal.Footer className="border-top-0">
      <CancelButton />
      <ModalButtons
        buttonText={buttonText}
        buttonAdditionalText={buttonAdditionalText}
        buttonHandler={buttonHandler}
        status={status}
      />
    </Modal.Footer>
  );
};

export default ModalFooter;
