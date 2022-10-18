import _ from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';

const initialState ={
	messages: JSON.parse(localStorage.getItem('messages')) || [],
	username: '',
}

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
});

export const {
	setMessages, 
	addMessage,
	setUserName,
	deleteMessages,
 } = messagesSlice.actions;

export default messagesSlice.reducer;
