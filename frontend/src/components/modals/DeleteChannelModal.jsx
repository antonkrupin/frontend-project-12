import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import { deleteMessages } from '../../slices/messagesReducer'; 
import { deleteChannelModalShow } from '../../slices/modalsReducer';
import { setActiveChannel, setChannelStatus } from '../../slices/channelsReducer';


const DeleteChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channels = useSelector((state) => state.channels.channels);

	const channelId = useSelector((state) => state.channels.channelForDelete.id);

	const isDeleteChannelModalShow = useSelector((state) => state.modals.isDeleteChannelModalShow);
	
	const { channelStatus } = useSelector((state) => state.channels);

	const deleteChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('deleting'));
		socket.emit('removeChannel', { id: channelId });
		dispatch(deleteMessages({ channelId }));
		dispatch(setActiveChannel(channels[0]));
		dispatch(deleteChannelModalShow());
	}

	return (
		<>
		<Modal show={isDeleteChannelModalShow} onHide={() => dispatch(deleteChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.delete.title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{i18n.t('ui.modals.delete.text')}
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<CancelButton />
				<ModalButtons
					buttonText={i18n.t('ui.buttons.delete')}
					buttonAdditionalText={i18n.t('ui.buttons.deleting')}
					buttonHandler={deleteChannelHandler}
					status={channelStatus}
				/>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default DeleteChannelModal;