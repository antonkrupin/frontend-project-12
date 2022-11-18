import _ from 'lodash';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import { setChannelStatus } from '../../slices/channelsReducer';
import { addChannelModalShow } from '../../slices/modalsReducer';


const AddChannelModal = (props) => {
	const dispatch = useDispatch();

	const ref = useRef();

	const modalType = useSelector((state) => state.modals.modalType);
	
	const { socket } = props;

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

	const [name, setChannelName] = useState(null);

	const { channelStatus } = useSelector((state) => state.channels);

	const [error, setError] = useState(null);

	const addChannelHanlder = (e) => {
		e.preventDefault();
		if (!_.includes(channelsNames, name)) {
			dispatch(setChannelStatus('adding'));
			socket.emit('newChannel', { name });
			dispatch(addChannelModalShow());
		} else {
			setError(i18n.t('errors.channels.createChannel'));
		}
	}

	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			addChannelHanlder(e);
		}
	}

	return (
		<>
		<Modal show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())} onKeyDown={(e) => onKeyDown(e)}>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.add.title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="is-invalid">
					<InputGroup
						className="mb-3 is-invalid required"
						name="channelName"
						onChange={(e) => setChannelName(e.target.value)}>
						<Form.Control aria-label="chartName" />
					</InputGroup>
					<label className="visually-hidden" htmlFor="channelName">Имя канала</label>
					<div className="text-danger">{error}</div>
				</Form>
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<CancelButton />
				<ModalButtons
					buttonText={i18n.t('ui.buttons.add')}
					buttonAdditionalText={i18n.t('ui.buttons.adding')}
					buttonHandler={addChannelHanlder}
					status={channelStatus}
				/>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default AddChannelModal;