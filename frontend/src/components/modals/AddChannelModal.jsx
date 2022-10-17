import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import { addChannelModalShow } from '../../slices/modalsReducer';

const AddChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;

	const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

	const [name, setChannelName] = useState(null);

	const addChannelHanlder = (e) => {
		e.preventDefault();
		socket.emit('newChannel', { name });
		dispatch(addChannelModalShow())
	}

	return (
		<>
			<Modal show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<InputGroup className="mb-3" onChange={(e) => setChannelName(e.target.value)}>
						<Form.Control aria-label="chartName" />
					</InputGroup>
				</Modal.Body>
        <Modal.Footer>
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