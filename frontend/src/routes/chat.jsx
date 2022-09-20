import axios from 'axios';

const Chat = () => {
	const userId = JSON.parse(localStorage.getItem('userId'));
	const test = { Authorization: `Bearer ${userId.token}` };
	const response = axios.get('/api/v1/data', { headers: test});
	response.then((data) => {
		console.log(data.data);
	})
  return <h2>Chat page of the App</h2>
}

export default Chat;

/*

axios.get('/api/v1/data').then((response) => {
  console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
});

*/