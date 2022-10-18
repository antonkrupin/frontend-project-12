import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Channel from './channel';
import RenameChannelModal from './modals/RenameChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';
import { setActiveChannel } from '../slices/channelsReducer';
import { addChannelModalShow } from '../slices/modalsReducer';

const ChannelsList = (props) => {
	const dispatch = useDispatch();

	const channels = useSelector((state) => state.channels.channels);
			
	const changeActiveChannel = (e) => {
		const channelName = e.target.textContent.slice(2);
		const activeChannel = channels.filter((channel) => channel.name === channelName ?? channel);
		dispatch(setActiveChannel(activeChannel[0]));
	}	
	
	return (
		<>
		<div className="d-flex justify-content-between mb-2 ps-4 pe-2">
			<span>Каналы</span>
			<button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(addChannelModalShow())}>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 16 16" 
					width="20" 
					height="20" 
					fill="currentColor">
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
						<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
				</svg>
				<span className="visually-hidden">+</span>
			</button>
		</div>
		<ul className="nav flex-column nav-pills nav-fill px-2">
			{ channels.map((channel) => <Channel key={channel.id} channel={channel} onClick={changeActiveChannel} />) }
		</ul>
		<RenameChannelModal socket={props.socket} channels={channels}/>
		<DeleteChannelModal socket={props.socket} channels={channels}/>
		</>
	)
}

export default ChannelsList;
