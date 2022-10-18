import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import { renameChannelModalShow } from '../../slices/modalsReducer';

const RenameChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const channelId = useSelector((state) => state.channels.renameChannelId);

	const renamedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);
	
	const [name, setChannelName] = useState(null);

	const renameChannelHandler = (e) => {
		e.preventDefault();
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channelId, name });
			dispatch(renameChannelModalShow())
		} else {
			console.log('double channel name');
		}
	}

	return (
		<>
		<Modal show={isRenameChannelModalShow} onHide={() => dispatch(renameChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>Переименовать канал</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="is-invalid" >
					<InputGroup className="mb-3 is-invalid required" onChange={(e) => setChannelName(e.target.value)}>
						<Form.Control aria-label="chartName" />
					</InputGroup>
				</Form>
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