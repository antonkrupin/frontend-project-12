import { useEffect } from 'react-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import ChannelsList from '../components/channelsList';
import ChannelName from '../components/channelName';
import ChannelWindow from '../components/channelWindow';
import ChannelMessages from '../components/channelMessages';

import { getChannels, setChannels, setActiveChannel } from '../slices/channelsReducer';
import { setMessages } from '../slices/messagesReducer';


const Chat = () => {
	const dispatch = useDispatch();
	const getData = () => {
		const userId = JSON.parse(localStorage.getItem('userId'));
		const header = { Authorization: `Bearer ${userId.token}` };
		return axios.get('/api/v1/data', { headers: header});
	};

	/*localStorage.setItem('channels', JSON.stringify(['tetst', 'testst']));
	localStorage.setItem('messages', JSON.stringify(['dsfdsfsf', 'fdfdsfsd']));
	const test = JSON.parse(localStorage.getItem('channels'));
	console.log('test', test);*/
	getData().then((data) => {
		localStorage.setItem('channels', JSON.stringify(data.data.channels));
		localStorage.setItem('messages', JSON.stringify(data.data.messages));
	}).then(() => {
		const channels = JSON.parse(localStorage.getItem('channels'));
		dispatch(setChannels(channels));
		dispatch(setActiveChannel(channels[0]));
		const messages = JSON.parse(localStorage.getItem('messages'));
		dispatch(setMessages(messages));
	})

	

  return (
		<div className="h-100 bg-light">
			<div className="h-100">
				<div className="h-100" id="chat">
					<div className="container h-100 my-4 overflow-hidden rounded shadow">
						<div className="row h-100 bg-white flex-md-row">
							<div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
								<ChannelsList />
							</div>
							<div className="col p-0 h-100">
								<div className="d-flex flex-column h-100">
									<div className="bg-light mb-4 p-3 shadow-sm small">
										<ChannelName />
									</div>
									<div id="messages-box" className="chat-messages overflow-auto px-5">
										<ChannelMessages />
									</div>
									<div className="mt-auto px-5 py-3">
										<ChannelWindow />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat;
