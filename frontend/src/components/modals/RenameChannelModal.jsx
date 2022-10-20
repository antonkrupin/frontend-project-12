import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18 from '../../asserts/i18';

import { renameChannelModalShow } from '../../slices/modalsReducer';
import { renameChannelId } from '../../slices/channelsReducer';

const RenameChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const channelId = useSelector((state) => state.channels.renameChannelId);

	const renamedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);
	
	const [name, setChannelName] = useState();

	const [error, setError] = useState('');

	const { renameChannelStatus } = useSelector((state) => state.channels);

	const [status, setStatus] = useState(null);

	const renameChannelHandler = (e) => {
		e.preventDefault();
		setStatus('renaming');
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channelId, name });
			setChannelName('');
			setError('');
			if (renameChannelStatus === 'renamed') {
				dispatch(renameChannelModalShow());
			}
		}
		setError(i18.t('errors.channels.renameChannel'));
	}

	const cancelRenameChannelHandler = () => {
		setChannelName('');
		setError('');
		dispatch(renameChannelModalShow());
		setStatus(null);
	}

	let buttonSend;
	buttonSend = (
		<button className="primary" onClick={renameChannelHandler}>Отправить</button>
	)
	if (renameChannelStatus === 'renaming' && status === 'renaming') {
		buttonSend = (
			<button type="submit" className="w-100 mb-3 btn btn-outline-primary disabled">
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
				Переименование
			</button>
		)
	}

	return (
		<>
		<Modal show={isRenameChannelModalShow} onHide={cancelRenameChannelHandler}>
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