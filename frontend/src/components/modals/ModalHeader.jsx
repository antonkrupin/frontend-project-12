import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';

const ModalHeader = (props) => {
  const { modalType } = props;

  let title;

  switch(modalType) {
    case 'add': {
      title = i18n.t('ui.modals.add.title');
      break;
    }
    case 'rename': {
      title = i18n.t('ui.modals.rename.title');
      break;
    }
    case 'delete': {
      title = i18n.t('ui.modal.delete.title');
      break;
    }
    default: {
      throw new Error('Unexpected modal type. Title creation.');
    }
  }
  return (
    <Modal.Header closeButton >
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
  )
};

export default ModalHeader;