import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18 from '../../asserts/i18';
import { setChannelStatus } from '../../slices/channelsReducer';
import { addChannelModalShow } from '../../slices/modalsReducer';

const AddChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

	const [name, setChannelName] = useState(null);

	const { channelStatus } = useSelector((state) => state.channels);

	const [status, setStatus] = useState(null);

	const [error, setError] = useState(null);

	const addChannelHanlder = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('adding'));
		if (!_.includes(channelsNames, name)) {
			socket.emit('newChannel', { name });
			//dispatch(addChannelModalShow())
			setStatus('added');
		} else {
			setError(i18.t('errors.channels.createChannel'));
		}
	}
	/*

	const renameChannelHandler = (e) => {
		e.preventDefault();
		setStatus('renaming');
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channelId, name });
			setChannelName('');
			setError('');
			setStatus('renamed');
			dispatch(renameChannelModalShow());
			if (renameChannelStatus === 'renamed') {
				dispatch(renameChannelModalShow());
			}
		} else {
			renameChannelStatus('renamed');
			setError(i18.t('errors.channels.renameChannel'));
		}
		
	}

	*/

	const onKeyDown = (e) => {
		console.log(e);
	};


	let buttonAdd;
	buttonAdd = (
		<button className="btn btn-primary" onClick={addChannelHanlder}>Отправить</button>
	)
	if (channelStatus === 'adding') {
		buttonAdd = (
			<button type="submit" className="btn btn-primary disabled">
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
				Создание
			</button>
		)
	}

	return (
		<>
		<Modal show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>Добавить канал</Modal.Title>
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
				<Button variant="secondary" onClick={() => dispatch(addChannelModalShow())}>
					Отменить
				</Button>
				{/*<Button variant="primary" onClick={addChannelHanlder}>
					Отправить
				</Button>*/}
				{buttonAdd}
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default AddChannelModal;