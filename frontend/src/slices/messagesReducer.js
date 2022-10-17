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
		},
		setUserName: (state, action) => {
			state.username = action.payload;
		},
	},
});

export const {
	setMessages, 
	addMessage,
	setUserName,
 } = messagesSlice.actions;

export default messagesSlice.reducer;
