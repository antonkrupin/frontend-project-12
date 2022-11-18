import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import {
  addChannelModalShow,
  renameChannelModalShow,
  deleteChannelModalShow
} from '../../slices/modalsReducer';
import { setError } from '../../slices/errorsReducer';

const CancelButton = () => {
  const dispatch = useDispatch();

	const modalType = useSelector((state) => state.modals.modalType);

  const buttonText = i18n.t('ui.buttons.cancel');

  let onClick;

	const modalShow = (modalShow) => {
		dispatch(modalShow);
		dispatch(setError(null));
	}

  switch(modalType) {
    case 'add': {
      //onClick = () => dispatch(addChannelModalShow());
			onClick = () => modalShow(addChannelModalShow());
      break;
    }
    case 'rename': {
      //onClick = () => dispatch(renameChannelModalShow());
			onClick = () => modalShow(renameChannelModalShow());
      break;
    }
    case 'delete' : {
      //onClick = () => dispatch(deleteChannelModalShow());
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
  )
};

export default CancelButton;