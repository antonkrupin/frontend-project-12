import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { selectModal } from '../../slices/selectors';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const ModalWindow = (props) => {
  const modalShow = useSelector(selectModal);
  /*
  show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())}
  show={isDeleteChannelModalShow} onHide={() => dispatch(deleteChannelModalShow())}
  show={isRenameChannelModalShow} onHide={cancelRenameChannelHandler}
  */
  const {
    socket,
    modalType,
    onHide,
    onChange,
    modalTitle,
    errorText,
    channelName,
    ref,
    onClick,
    cancelButtonText,
    buttonText,
    buttonAdditionalText,
    buttonHandler,
    status,
    bodyText = null,
  } = props;

  // const [name, setChannelName] = useState(null);

  switch (modalType) {
    case 'add': {
      return (
        <Modal show={modalShow} onHide={onHide}>
          <ModalHeader modalType={modalType} />
          <ModalBody modalType={modalType} />
          <ModalFooter modalType={modalType} />
        </Modal>
      );
    }
    case 'rename': {
      return (
        <Modal show={modalShow} onHide={onHide}>
          <ModalHeader title={modalTitle} />
          <ModalBody
            modalType={modalType}
            onChange={onChange}
            errorText={errorText}
            channelName={channelName}
            ref={ref}
            bodyText={bodyText}
          />
          <ModalFooter
            socket={socket}
            onClick={onClick}
            cancelButtonText={cancelButtonText}
            buttonText={buttonText}
            buttonAdditionalText={buttonAdditionalText}
            buttonHandler={buttonHandler}
            status={status}
          />
        </Modal>
      );
    }
    case 'delete': {
      return (
        <Modal show={modalShow} onHide={onHide}>
          <ModalHeader title={modalTitle} />
          <ModalBody
            modalType={modalType}
            onChange={onChange}
            errorText={errorText}
            channelName={channelName}
            ref={ref}
            bodyText={bodyText}
          />
          <ModalFooter
            onClick={onClick}
            cancelButtonText={cancelButtonText}
            buttonText={buttonText}
            buttonAdditionalText={buttonAdditionalText}
            buttonHandler={buttonHandler}
            status={status}
          />
        </Modal>
      );
    }
    default:
      throw new Error('Unexpected modal type');
  }

  /* return (
    <Modal show={onShow} onHide={onHide} >
      <ModalHeader title={modalTitle}/>
      <ModalBody
        modalType={modalType}
        onChange={onChange}
        errorText={errorText}
        channelName={channelName}
        ref={ref}
        bodyText={bodyText}
      />
      <ModalFooter
        onClick={onClick}
        cancelButtonText={cancelButtonText}
        buttonText={buttonText}
        buttonAdditionalText={buttonAdditionalText}
        buttonHandler={buttonHandler}
        status={status}
      />
    </Modal>
  ) */
};

export default ModalWindow;
