import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import {
  addChannelModalShow,
  renameChannelModalShow,
  deleteChannelModalShow
} from '../../slices/modalsReducer';

const CancelButton = (props) => {
   const dispatch = useDispatch();

  const { modalType } = props;

  const buttonText = i18n.t('ui.buttons.cancel');

  let onClick;

  switch(modalType) {
    case 'add': {
      onClick = () => dispatch(addChannelModalShow());
      break;
    }
    case 'rename': {
      onClick = () => dispatch(renameChannelModalShow());
      break;
    }
    case 'delete' : {
      onClick = () => dispatch(deleteChannelModalShow());
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