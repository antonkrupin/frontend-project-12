import { createSlice, current } from '@reduxjs/toolkit';

const initialState ={
	messages: JSON.parse(localStorage.getItem('messages')),
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			const keys = state.messages.map((elem) => elem.channelName);
			const { message, activeChannel } = action.payload;

			if (keys.indexOf(activeChannel) === -1) {
				state.messages.push({
					channelName: activeChannel,
					messages: [message],
				});
			} else {
				state.messages.forEach((elem) => {
					if (elem.channelName === activeChannel) {
						elem.messages.push(message);
					}
				});
			}
		},
	},
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;