import { Provider } from 'react-redux';
import axios from 'axios';

import ChannelsList from '../components/channelsList';
import ChannelName from '../components/channelName';
import ChannelWindow from '../components/channelWindow';
import store from '../slices/index.js';


const Chat = () => {
	const getData = async () => {
		const userId = JSON.parse(localStorage.getItem('userId'));
		const test = { Authorization: `Bearer ${userId.token}` };
		return await axios.get('/api/v1/data', { headers: test});
	};

	const response = getData();
	response.then((data) => {
		localStorage.setItem('channels', JSON.stringify(data.data.channels));
		localStorage.setItem('messages', JSON.stringify(data.data.messages));
	})
	
  return (
		<>
			<Provider store={store}>
				<h1>Chat page of the App</h1>
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
									<div className="text-break mb-2">
										<b>Test text</b>
									</div>
								</div>
								<div className="mt-auto px-5 py-3">
									<ChannelWindow />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Provider>
		</>
	)
}

export default Chat;
