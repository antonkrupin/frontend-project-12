import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import { deleteMessages } from '../../slices/messagesReducer'; 
import { deleteChannelModalShow } from '../../slices/modalsReducer';

const DeleteChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const channelId = useSelector((state) => state.channels.deleteChannelId);

	const deletedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isDeleteChannelModalShow = useSelector((state) => state.modals.isDeleteChannelModalShow);
	
	const [name, setChannelName] = useState(null);

	const deleteChannelHandler = (e) => {
		e.preventDefault();
		socket.emit('removeChannel', { id: channelId });
		dispatch(deleteMessages({ channelId }));
		dispatch(deleteChannelModalShow());
	}

	return (
		<>
		<Modal show={isDeleteChannelModalShow} onHide={() => dispatch(deleteChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>Удалить канал</Modal.Title>
			</Modal.Header>
			<Modal.Footer className="border-top-0">
				<Button variant="secondary" onClick={() => dispatch(deleteChannelModalShow())}>
					Отменить
				</Button>
				<Button variant="danger" onClick={deleteChannelHandler}>
					Удалить
				</Button>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default DeleteChannelModal;