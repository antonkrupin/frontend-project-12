import { createSlice, current } from '@reduxjs/toolkit';

const initialState ={
	messages: JSON.parse(localStorage.getItem('messages')),
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			console.log(current(state));
			console.log(action.payload);
			if (state.messages.length === 0) {
				const { message, activeChannelName } = action.payload;
				state.messages.push({
					channelName: activeChannelName,
					messages: [message],
				});
			}
			//state.messages = [action.payload, ...state.messages];
			console.log(current(state.messages));
			//console.log(state.messages);
			//console.log(state.messages.length);
			//console.log(state.messages);
		},
	},
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;