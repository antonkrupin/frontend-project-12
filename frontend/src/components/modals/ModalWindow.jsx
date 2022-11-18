import { useState } from 'react';  
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
    onShow,
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
    bodyText = null
  } = props;

  const [name, setChannelName] = useState(null);

  switch(props.modalType) {
    case 'add': {
      return (
        <Modal show={modalShow} onHide={onHide} >
          <ModalHeader modalType={modalType}/>
          <ModalBody modalType={modalType}/>
          <ModalFooter modalType={modalType}/>
        </Modal>
      )
    }
    case 'rename': {
      return (
        <Modal show={modalShow} onHide={onHide} >
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
            socket={socket}
            onClick={onClick}
            cancelButtonText={cancelButtonText}
            buttonText={buttonText}
            buttonAdditionalText={buttonAdditionalText}
            buttonHandler={buttonHandler}
            status={status}
          />
        </Modal>
      )
    }
    case 'delete': {
      return (
        <Modal show={modalShow} onHide={onHide} >
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
      )
    }
    default:
      throw new Error('Unexpected modal type');
  }

  return (
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
  )
};

export default ModalWindow;

/*

 const {
    onClick,
    cancelButtonText,
    buttonText,
    buttonAdditionalText,
    buttonHandler,
    status
  } = props;


<Modal show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.add.title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="is-invalid" >
					<InputGroup className="mb-3 is-invalid required" onChange={(e) => setChannelName(e.target.value)}>
						<Form.Control aria-label="chartName" />
					</InputGroup>
					<div className="text-danger">{error}</div>
				</Form>
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<CancelButton
					onClick={() => dispatch(addChannelModalShow())}
					text={i18n.t('ui.buttons.cancel')}
				/>
				<ModalButtons
					buttonText={i18n.t('ui.buttons.add')}
					buttonAdditionalText={i18n.t('ui.buttons.adding')}
					buttonHandler={addChannelHanlder}
					status={channelStatus}
				/>
			</Modal.Footer>
		</Modal>


*/