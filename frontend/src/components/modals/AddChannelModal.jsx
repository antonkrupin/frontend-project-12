import _ from 'lodash';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import { setChannelStatus } from '../../slices/channelsReducer';
import { addChannelModalShow } from '../../slices/modalsReducer';


const AddChannelModal = (props) => {
	const dispatch = useDispatch();
	
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
	
	return (
		<>
		<Modal show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.add.title')}</Modal.Title>
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
				<CancelButton
					onClick={() => dispatch(addChannelModalShow())}
					text={i18n.t('ui.buttons.cancel')}
				/>
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