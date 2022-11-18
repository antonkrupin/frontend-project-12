import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import i18n from '../asserts/i18';

import Channel from './channel';
import AddChannelModal from './modals/AddChannelModal';
import RenameChannelModal from './modals/RenameChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';
import IconAddChannel from '../components/svgIcons/IconAddChannel';

import { setActiveChannel } from '../slices/channelsReducer';
import { addChannelModalShow } from '../slices/modalsReducer';


const ChannelsList = (props) => {
	const dispatch = useDispatch();

	const channels = useSelector((state) => state.channels.channels);

	//const modalShow = useSelector(selectModal);

	//const modalType = useSelector((state) => state.modals.modalType);
			
	const changeActiveChannel = (e) => {
		const channelName = e.target.textContent.slice(2);
		const activeChannel = channels.filter((channel) => channel.name === channelName ?? channel);
		dispatch(setActiveChannel(activeChannel[0]));
	}	
	
	return (
		<>
		<div className="d-flex justify-content-between mb-2 ps-4 pe-2">
			<span>{i18n.t('ui.channels')}</span>
			<button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(addChannelModalShow())}>
				<IconAddChannel />
			</button>
		</div>
		<ul className="nav flex-column nav-pills nav-fill px-2">
			{ channels.map((channel) => <Channel key={channel.id} channel={channel} onClick={changeActiveChannel} />) }
		</ul>
		<AddChannelModal socket={props.socket}/>
		<RenameChannelModal socket={props.socket} channels={channels}/>
		<DeleteChannelModal socket={props.socket} channels={channels}/>
		</>
	)
}

export default ChannelsList;

/*
<ModalWindow socket={props.socket} modalShow={modalShow} modalType={modalType}/>
*/