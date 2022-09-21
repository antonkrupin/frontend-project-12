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
				<div className="container">
					<div className="row">
						<div className="col-2 bg-info h-100">
							<ChannelsList />
						</div>
						<div className="col-10">
							<div className="row bg-info">
								<ChannelName />
							</div>
							<div className="row">
								<ChannelWindow />
							</div>
						</div>
					</div>
				</div>
			</Provider>
		</>
	)
}

export default Chat;
