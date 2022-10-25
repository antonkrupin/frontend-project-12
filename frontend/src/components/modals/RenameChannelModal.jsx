import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';
import cn from 'classnames';

import i18n from '../../asserts/i18';
import changeClassName from '../../asserts/classNames';

import ModalButtons from '../buttons/ModalButtons';
import ErrorsDiv from '../errors/ErrorsDiv';
import { renameChannelModalShow } from '../../slices/modalsReducer';
import { renameChannelId, setChannelStatus } from '../../slices/channelsReducer';


const RenameChannelModal = (props) => {
	const dispatch = useDispatch();

	const ref = useRef();

	const { socket } = props;
	
	const channelId = useSelector((state) => state.channels.renameChannelId);

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);
	
	//const renamedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);
	
	const [name, setChannelName] = useState(null);

	const [error, setError] = useState('');

	const { channelStatus } = useSelector((state) => state.channels);

	const renameChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('renaming'));
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channelId, name });
			setChannelName('');
			setError('');
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

	/*let buttonSend;
	buttonSend = (
		<button className="btn btn-primary" onClick={renameChannelHandler}>{i18n.t('ui.buttons.rename')}</button>
	)
	if (channelStatus === 'renaming') {
		buttonSend = (
			<button type="submit" className="btn btn-primary disabled">
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
				{i18n.t('ui.buttons.renaming')}
			</button>
		)
	}*/

	return (
		<>
		<Modal show={isRenameChannelModalShow} onHide={cancelRenameChannelHandler} >
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.titles.renameChannel')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<input 
						onChange={(e) => setChannelName(e.target.value)}
						required
						id="channelName"
						className="form-control"
						defaultValue={channelId}
						ref={ref}
					/>
					<ErrorsDiv errorText={error}/>
				</form>
			</Modal.Body>
			<Modal.Footer className="border-top-0">
				<Button variant="secondary" onClick={cancelRenameChannelHandler}>
					Отменить
				</Button>
				{/*<Button variant="primary" onClick={renameChannelHandler}>
					Отправить
				</Button>*/}
				{/*buttonSend*/}
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