import { createSlice, current } from '@reduxjs/toolkit';

const initialState ={
	messages: JSON.parse(localStorage.getItem('messages')) || {},
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages: (state, action) => {
			state.messages = action.payload;
		},
		addMessage: (state, action) => {
			const { message, id } = action.payload;
			if (id in state.messages) {
				state.messages[id].push(message);
			} else {
				state.messages[id] = [message];
			}
			localStorage.setItem('messages', JSON.stringify(state.messages));
		},
	},
});

export const {
	setMessages, 
	addMessage,
 } = messagesSlice.actions;

export default messagesSlice.reducer;