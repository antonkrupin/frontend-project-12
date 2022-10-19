import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18 from '../../assets/i18';

import { renameChannelModalShow } from '../../slices/modalsReducer';

const RenameChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const channelId = useSelector((state) => state.channels.renameChannelId);

	const renamedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);
	
	const [name, setChannelName] = useState('');

	const [error, setError] = useState('');
	
	const renameChannelHandler = (e) => {
		e.preventDefault();
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channelId, name });
			dispatch(renameChannelModalShow())
		}
		setError(i18.t('errors.channels.renameChannel'));
	}

	return (
		<>
		<Modal show={isRenameChannelModalShow} onHide={() => dispatch(renameChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>Переименовать канал</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<input 
						onChange={(e) => setChannelName(e.target.value)}
						required
						id="channelName"
						className="form-control"
						defaultValue={name}
					/>
					<div className="text-danger">{error}</div>
				</form>
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<Button variant="secondary" onClick={() => dispatch(renameChannelModalShow())}>
					Отменить
				</Button>
				<Button variant="primary" onClick={renameChannelHandler}>
					Отправить
				</Button>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default RenameChannelModal;