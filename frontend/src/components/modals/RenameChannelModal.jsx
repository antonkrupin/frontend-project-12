import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18 from '../../asserts/i18';

import { renameChannelModalShow } from '../../slices/modalsReducer';
import { renameChannelId, setChannelStatus } from '../../slices/channelsReducer';

const RenameChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const channelId = useSelector((state) => state.channels.renameChannelId);

	//const renamedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);
	
	const [name, setChannelName] = useState();

	const [error, setError] = useState('');

	const { channelStatus } = useSelector((state) => state.channels);

	const renameChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('renaming'));
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channelId, name });
			setChannelName('');
			setError('');
		} else {
			dispatch(setChannelStatus(null));
			setError(i18.t('errors.channels.renameChannel'));
		}
		
	}

	const cancelRenameChannelHandler = () => {
		setChannelName('');
		setError('');
		dispatch(renameChannelModalShow());
	}

	let buttonSend;
	buttonSend = (
		<button className="btn btn-primary" onClick={renameChannelHandler}>Отправить</button>
	)
	if (channelStatus === 'renaming') {
		buttonSend = (
			<button type="submit" className="btn btn-primary disabled">
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
				Переименование
			</button>
		)
	}

	return (
		<>
		<Modal show={isRenameChannelModalShow} onHide={cancelRenameChannelHandler} >
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
				<Button variant="secondary" onClick={cancelRenameChannelHandler}>
					Отменить
				</Button>
				{/*<Button variant="primary" onClick={renameChannelHandler}>
					Отправить
				</Button>*/}
				{buttonSend}
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default RenameChannelModal;