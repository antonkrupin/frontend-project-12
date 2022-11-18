import _ from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import { setChannelStatus } from '../../slices/channelsReducer';
import { addChannelModalShow } from '../../slices/modalsReducer';
import { setError } from '../../slices/errorsReducer';


const AddChannelModal = (props) => {
	const dispatch = useDispatch();

	const target = useRef(null);
	
	const { socket } = props;

	const error = useSelector((state) => state.errors.error);

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

	const [name, setChannelName] = useState(null);

	const { channelStatus } = useSelector((state) => state.channels);

	useEffect(() => {
		if (target.current) {
			target.current.focus();
		}
	});

	const addChannelHanlder = (e) => {
		e.preventDefault();
		if (name !== null) {
			if (!_.includes(channelsNames, name)) {
				dispatch(setChannelStatus('adding'));
				socket.emit('newChannel', { name });
				dispatch(addChannelModalShow());
				setChannelName(null);
				dispatch(setError(null));
			} else {
				dispatch(setError(i18n.t('errors.channels.createChannel')));
			}
		} else {
			dispatch(setError(i18n.t('errors.channels.notNull')));
		}
	}

	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			addChannelHanlder(e);
		}
	}

	const closeModal = () => {
		dispatch(addChannelModalShow());
		setChannelName(null);
		dispatch(setError(null));
	}

	return (
		<>
		<Modal
			show={isAddChannelModalShow}
			onHide={closeModal}
			onKeyDown={(e) => onKeyDown(e)}	>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.add.title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<input
						className="form-control"
						name="channelName"
						onChange={(e) => setChannelName(e.target.value)}
						ref={target} />
						<label className="visually-hidden" htmlFor="channelName">Имя канала</label>
						<div className="text-danger">{error}</div>
				</form>
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
