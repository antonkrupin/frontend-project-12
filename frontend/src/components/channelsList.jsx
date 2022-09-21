import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { getChannels, setActiveChannel } from '../slices/channelsReducer';

const ChannelsList = () => {
	const channels = useSelector((state) => state.channels.value);
	const dispatch = useDispatch();

	const getChannelName = (e) => {
		dispatch(setActiveChannel(e.target.textContent));
	}	
	
	return (
		<>
		<h4>Каналы</h4>
		{ channels.map((item) => <Nav.Link key={item.id} href="#" onClick={getChannelName}># {item.name}</Nav.Link> ) }
		</>
	)
}

export default ChannelsList;

/*

if (document.readyState === "complete") {
      onPageLoad();
    }

*/