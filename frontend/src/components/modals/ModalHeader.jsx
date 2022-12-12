import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import { fetchModalType } from '../../slices/selectors';

const Header = (props) => {
  const { title } = props;
  return (
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
  );
};

const ModalHeader = () => {
  const modalType = useSelector(fetchModalType);

  const title = {
    add: i18n.t('ui.modals.add.title'),
    rename: i18n.t('ui.modals.rename.title'),
    delete: i18n.t('ui.modal.delete.title'),
  };

  switch (modalType) {
    case 'add': {
      return (
        <Header title={title.add} />
      );
    }
    case 'rename': {
      return (
        <Header title={title.rename} />
      );
    }
    case 'delete': {
      return (
        <Header title={title.delete} />
      );
    }
    default: {
      throw new Error('Unexpected modal type. Title creation.');
    }
  }
};

export default ModalHeader;
