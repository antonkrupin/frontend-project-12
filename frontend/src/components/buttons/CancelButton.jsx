import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import {
  // addChannelModalShow,
  // renameChannelModalShow,
  // deleteChannelModalShow,
  setModalShow,
} from '../../slices/modalsReducer';

// import { fetchModalType } from '../../slices/selectors';

const CancelButton = () => {
  const dispatch = useDispatch();

  // const modalType = useSelector(fetchModalType);

  const buttonText = i18n.t('ui.buttons.cancel');

  // eslint-disable-next-line functional/no-let
  // let onClick;

  /* const modalShow = (showModalFunc) => {
    dispatch(showModalFunc);
    // dispatch(setError(null));
  }; */

  /* switch (modalType) {
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
  } */

  return (
    <Button variant="secondary" onClick={() => dispatch(setModalShow())}>
      { buttonText }
    </Button>
  );
};

export default CancelButton;
