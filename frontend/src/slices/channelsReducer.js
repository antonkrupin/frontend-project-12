import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	channels: JSON.parse(localStorage.getItem('channels')),
	activeChannel: JSON.parse(localStorage.getItem('channels')),
	activeChannelMessages: JSON.parse(localStorage.getItem('messages')),
}

const channelsSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		getChannels: (state) => {
			state.channels = JSON.parse(localStorage.getItem('channels'));
		},
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload;
		},
		getActiveChannelMessages: (state) => {

		},
	},
});

export const { 
	getChannels, 
	setActiveChannel, 
	getActiveChannelMessages } = channelsSlice.actions;

export default channelsSlice.reducer;

/*
	const channels = JSON.parse(localStorage.getItem('channels'));
*/