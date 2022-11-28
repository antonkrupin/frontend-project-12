import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';
import changeClassName from '../../asserts/classNames';

import {
	fetchError,
	fetchChannelsNames,
	fetchChannelStatus
} from '../../slices/selectors';

import { setChannelStatus } from '../../slices/channelsReducer';
import { addChannelModalShow } from '../../slices/modalsReducer';
import { setError } from '../../slices/errorsReducer';


const AddChannelModal = (props) => {
	const { socket } = props;

	const dispatch = useDispatch();

	const inputRef = useRef(null);
	
	const channelsNames = useSelector(fetchChannelsNames);

	const channelStatus = useSelector(fetchChannelStatus);

	const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	const addChannelHanlder = (e) => {
		e.preventDefault();
		const name = inputRef.current.value;
		if (name !== '') {
			if (!_.includes(channelsNames, name)) {
				dispatch(setChannelStatus('adding'));
				socket.emit('newChannel', { name });
				dispatch(addChannelModalShow());
				dispatch(setError(null));
			} else {
				inputRef.current.className = changeClassName('form-control is-invalid');
				dispatch(setError(i18n.t('errors.channels.createChannel')));
			}
		} else {
			inputRef.current.className = changeClassName('form-control is-invalid');
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
						ref={inputRef} 
						/>
						{/*<label htmlFor="channelName">Имя канала</label>*/}
						<span className="visually-hidden">Имя канала</span>
						<ErrorsDiv errorText={useSelector(fetchError)}/>
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
