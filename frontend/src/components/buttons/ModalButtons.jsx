import React from 'react';
import { useSelector } from 'react-redux';

import ModalButton from './ModalButton';

import { fetchChannelStatus } from '../../slices/selectors';

const ModalButtons = (props) => {
  const {
    buttonText,
    buttonAdditionalText,
    buttonHandler,
  } = props;

  const status = useSelector(fetchChannelStatus);

  switch (status) {
    case null: {
      return (
        <ModalButton
          className="btn btn-primary"
          buttonHandler={buttonHandler}
          buttonText={buttonText}
          loading={false}
        />
      );
    }
    case 'adding': {
      return (
        <ModalButton
          className="btn btn-primary disabled"
          buttonText={buttonAdditionalText}
          loading
        />
      );
    }
    case 'added': {
      return (
        <ModalButton
          className="btn btn-primary"
          buttonHandler={buttonHandler}
          buttonText={buttonText}
          loading={false}
        />
      );
    }
    case 'renaming': {
      return (
        <ModalButton
          className="btn btn-primary disabled"
          buttonText={buttonAdditionalText}
          loading
        />
      );
    }
    case 'renamed': {
      return (
        <ModalButton
          className="btn btn-primary"
          buttonHandler={buttonHandler}
          buttonText={buttonText}
          loading={false}
        />
      );
    }
    case 'delete': {
      return (
        <ModalButton
          className="btn btn-danger"
          buttonHandler={buttonHandler}
          buttonText={buttonText}
          loading={false}
        />
      );
    }
    case 'deleting': {
      return (
        <ModalButton
          className="btn btn-danger disabled"
          buttonText={buttonAdditionalText}
          loading
        />
      );
    }
    case 'deleted': {
      return (
        <ModalButton
          className="btn btn-danger"
          buttonHandler={buttonHandler}
          buttonText={buttonText}
          loading={false}
        />
      );
    }
    default:
      throw new Error('Unknow status');
  }
};

export default ModalButtons;
