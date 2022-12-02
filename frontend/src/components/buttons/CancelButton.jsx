import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import {
  addChannelModalShow,
  renameChannelModalShow,
  deleteChannelModalShow,
} from '../../slices/modalsReducer';
import { setError } from '../../slices/errorsReducer';
import { fetchModalType } from '../../slices/selectors';

const CancelButton = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(fetchModalType);

  const buttonText = i18n.t('ui.buttons.cancel');

  // eslint-disable-next-line functional/no-let
  let onClick;

  const modalShow = (showModalFunc) => {
    dispatch(showModalFunc);
    dispatch(setError(null));
  };

  switch (modalType) {
    case 'add': {
      onClick = () => modalShow(addChannelModalShow());
      break;
    }
    case 'rename': {
      onClick = () => modalShow(renameChannelModalShow());
      break;
    }
    case 'delete': {
      onClick = () => modalShow(deleteChannelModalShow());
      break;
    }
    default:
      throw new Error('Unexpected modal type. Cancel button.');
  }

  return (
    <Button variant="secondary" onClick={onClick}>
      { buttonText }
    </Button>
  );
};

export default CancelButton;
