import _ from 'lodash';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
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
	
	/*let buttonAdd;
	buttonAdd = (
		<button className="btn btn-primary" onClick={addChannelHanlder}>{i18n.t('ui.buttons.add')}</button>
	)
	if (channelStatus === 'adding') {
		buttonAdd = (
			<button type="submit" className="btn btn-primary disabled">
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
				{i18n.t('ui.buttons.adding')}
			</button>
		)
	}*/

	return (
		<>
		<Modal show={isAddChannelModalShow} onHide={() => dispatch(addChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.titles.addChannel')}</Modal.Title>
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
					{i18n.t('ui.buttons.cancel')}
				</Button>
				{/*<Button variant="primary" onClick={addChannelHanlder}>
					Отправить
				</Button>*/}
				{/*buttonAdd*/}
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