import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import cn from 'classnames';

import i18n from '../../asserts/i18';
import changeClassName from '../../asserts/classNames';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';
import { renameChannelModalShow } from '../../slices/modalsReducer';
import { renameChannelId, setChannelStatus } from '../../slices/channelsReducer';


const RenameChannelModal = (props) => {
	const dispatch = useDispatch();

	const ref = useRef();

	const { socket } = props;
	
	const channel = useSelector((state) => state.channels.channelForRename);

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);
	
	const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);
	
	const [name, setChannelName] = useState(null);

	const [error, setError] = useState('');

	const { channelStatus } = useSelector((state) => state.channels);

	const renameChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('renaming'));
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channel.id, name });
			setChannelName('');
			setError('');
			dispatch(renameChannelModalShow());
		} else {
			dispatch(setChannelStatus(null));
			//const className = cn('form-control', 'is-invalid');
			ref.current.className = changeClassName('form-control is-invalid');
			setError(i18n.t('errors.channels.renameChannel'));
		}
		
	}

	const cancelRenameChannelHandler = () => {
		setChannelName('');
		setError('');
		dispatch(renameChannelModalShow());
	}

	return (
		<>
		<Modal show={isRenameChannelModalShow} onHide={cancelRenameChannelHandler} >
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.rename.title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<input 
						onChange={(e) => setChannelName(e.target.value)}
						required
						id="channelName"
						className="form-control"
						defaultValue={channel.name}
						ref={ref}
					/>
					<ErrorsDiv errorText={error}/>
				</form>
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<CancelButton 
					onClick={cancelRenameChannelHandler}
					text={i18n.t('ui.buttons.cancel')}
				/>
				<ModalButtons
					buttonText={i18n.t('ui.buttons.rename')}
					buttonAdditionalText={i18n.t('ui.buttons.renaming')}
					buttonHandler={renameChannelHandler}
					status={channelStatus}
				/>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default RenameChannelModal;