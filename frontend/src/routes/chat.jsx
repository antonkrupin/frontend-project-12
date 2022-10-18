import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import socketIO from 'socket.io-client';

import ChannelsList from '../components/channelsList';
import ChannelName from '../components/channelName';
import ChannelWindow from '../components/channelWindow';
import ChannelMessages from '../components/channelMessages';
import AddChannelModal from '../components/modals/AddChannelModal';
import RenameChannelModal from '../components/modals/RenameChannelModal';

import { setUserName, addMessage } from '../slices/messagesReducer';
import { addChannel, setChannels, setActiveChannel, renameChannel, deleteChannel } from '../slices/channelsReducer';

const Chat = (props) => {
	const dispatch = useDispatch();
	const socket = props.socket;
	//const socket = socketIO.connect('http://localhost:3000');
	//console.log(socket.emit('newMessage', { body: 'test message', channelId: 1, id: 8, username: 'admin' }));
	/*const test = socket.on('newMessage', (payload) => {
		console.log(payload);
	});*/

	const getData = () => {
		const userId = JSON.parse(localStorage.getItem('userId'));
		const header = { Authorization: `Bearer ${userId.token}` };
		return axios.get('/api/v1/data', { headers: header});
	};

	getData().then((data) => {
		localStorage.setItem('channels', JSON.stringify(data.data.channels));
		localStorage.setItem('messages', JSON.stringify(data.data.messages));
	}).then(() => {
		const channels = JSON.parse(localStorage.getItem('channels'));
		const username = JSON.parse(localStorage.getItem('userId')).username;
		dispatch(setUserName(username));
		dispatch(setChannels(channels));
		dispatch(setActiveChannel(channels[0]));
	});

	useEffect(() => {
		socket.on('newMessage', (payload) => {
			dispatch(addMessage(payload));
		});
		socket.on('newChannel', (payload) => {
			dispatch(setActiveChannel(payload));
			dispatch(addChannel(payload));
		});
		socket.on('renameChannel', (payload) => {
			dispatch(renameChannel(payload));
		});
		socket.on('removeChannel', (payload) => {
			dispatch(deleteChannel(payload));
		});
	}, []);

  return (
		<>
			<div className="h-100 bg-light">
				<div className="h-100">
					<div className="h-100" id="chat">
						<div className="container h-100 my-4 overflow-hidden rounded shadow">
							<div className="row h-100 bg-white flex-md-row">
								<div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
									<ChannelsList socket={socket}/>
								</div>
								<div className="col p-0 h-100">
									<div className="d-flex flex-column h-100">
										<div className="bg-light mb-4 p-3 shadow-sm small">
											<ChannelName socket={socket}/>
										</div>
										<div id="messages-box" className="chat-messages overflow-auto px-5">
											<ChannelMessages socket={socket}/>
										</div>
										<div className="mt-auto px-5 py-3">
											<ChannelWindow socket={socket}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AddChannelModal socket={socket}/>
		</>
	)
}

export default Chat;
