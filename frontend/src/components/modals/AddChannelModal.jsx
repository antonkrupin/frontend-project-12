import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import { addChannelModalShow } from '../../slices/modalsReducer';

const AddChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

	const [name, setChannelName] = useState(null);

	const addChannelHanlder = (e) => {
		e.preventDefault();
		if (!_.includes(channelsNames, name)) {
			socket.emit('newChannel', { name });
			dispatch(addChannelModalShow())
		} else {
			console.log('double channel name');
		}
		
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
				</Form>
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<Button variant="secondary" onClick={() => dispatch(addChannelModalShow())}>
					Отменить
				</Button>
				<Button variant="primary" onClick={addChannelHanlder}>
					Отправить
				</Button>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default AddChannelModal;