import _ from 'lodash';
import axios from 'axios';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

const initialState ={
	messages: [],
	username: '',
}

export const fetchMessages = createAsyncThunk(
	'messages/fetchMessages',
	async function() {
		const userId = JSON.parse(localStorage.getItem('userId'));
		const header = { Authorization: `Bearer ${userId.token}` };

		const response = await axios.get('/api/v1/data', { headers: header});

		const messages = response.data.messages;

		return messages;
	}
);

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages: (state, action) => {
			state.messages = action.payload;
		},
		addMessage: (state, action) => {
			state.messages.push(action.payload);
			localStorage.setItem('messages', JSON.stringify(state.messages));
		},
		setUserName: (state, action) => {
			state.username = action.payload;
		},
		deleteMessages: (state, action) => {
			const { channelId } = action.payload;
			const result = [];
			state.messages.forEach((message) => {
				if (message.channelId === channelId) {
					result.push(current(message));
				}
			});
			const difference = _.differenceBy(current(state.messages), result, 'channelId');
			state.messages = difference;
			localStorage.setItem('messages', JSON.stringify(state.messages));
		},
	},
	extraReducers: {
		[fetchMessages.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchMessages.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.messages = action.payload;
		},
		[fetchMessages.rejected]: (state, action) => {},
	},
});

export const {
	setMessages, 
	addMessage,
	setUserName,
	deleteMessages,
 } = messagesSlice.actions;

export default messagesSlice.reducer;
