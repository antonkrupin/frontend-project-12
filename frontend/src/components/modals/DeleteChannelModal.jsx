import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, InputGroup, Modal, Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import ModalButtons from '../buttons/ModalButtons';
import { deleteMessages } from '../../slices/messagesReducer'; 
import { deleteChannelModalShow } from '../../slices/modalsReducer';
import { setActiveChannel, setChannelStatus } from '../../slices/channelsReducer';


const DeleteChannelModal = (props) => {
	const dispatch = useDispatch();

	const { socket } = props;
	
	const channels = useSelector((state) => state.channels.channels);

	const channelsNames = useSelector((state) => state.channels.channels).map(({name}) => name);

	const channelId = useSelector((state) => state.channels.channelForDelete.id);

	const deletedChannel = useSelector((state) => state.channels.channels).filter(({id}) => id === channelId);

	const isDeleteChannelModalShow = useSelector((state) => state.modals.isDeleteChannelModalShow);
	
	const [name, setChannelName] = useState(null);

	const { channelStatus } = useSelector((state) => state.channels);

	const deleteChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('deleting'));
		socket.emit('removeChannel', { id: channelId });
		dispatch(deleteMessages({ channelId }));
		dispatch(setActiveChannel(channels[0]));
		dispatch(deleteChannelModalShow());
	}

	/*let buttonDelete;
	buttonDelete = (
		<button className="btn btn-danger" onClick={deleteChannelHandler}>{i18n.t('ui.buttons.delete')}</button>
	)
	if (channelStatus === 'deleting') {
		buttonDelete = (
			<button type="submit" className="btn btn-danger disabled">
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
				{i18n.t('ui.buttons.deleting')}
			</button>
		)
	}*/

	return (
		<>
		<Modal show={isDeleteChannelModalShow} onHide={() => dispatch(deleteChannelModalShow())}>
			<Modal.Header closeButton >
				<Modal.Title>{i18n.t('ui.modals.titles.deleteChannel')}</Modal.Title>
			</Modal.Header>
			<Modal.Footer className="border-top-0">
				<Button variant="secondary" onClick={() => dispatch(deleteChannelModalShow())}>
					{i18n.t('ui.buttons.cancel')}
				</Button>
				{/*<Button variant="danger" onClick={deleteChannelHandler}>
					Удалить
					</Button>*/}
				{/*buttonDelete*/}
				<ModalButtons
					buttonText={i18n.t('ui.buttons.delete')}
					buttonAdditionalText={i18n.t('ui.buttons.deleting')}
					buttonHandler={deleteChannelHandler}
					status={channelStatus}
				/>
			</Modal.Footer>
		</Modal>
		</>
	)
};

export default DeleteChannelModal;