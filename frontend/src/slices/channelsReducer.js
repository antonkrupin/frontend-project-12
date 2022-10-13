import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	channels: [],
	activeChannel: [],
	activeChannelMessages: JSON.parse(localStorage.getItem('messages')) || [],
}

const channelsSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		getChannels: (state) => {
			state.channels = JSON.parse(localStorage.getItem('channels'));
		},
		setChannels: (state, action) => {
			state.channels = action.payload;
		},
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload;
			console.log(`active channel state`,state.activeChannel);
		},
		getActiveChannelMessages: (state) => {

		},
	},
});

export const { 
	getChannels,
	setChannels,
	setActiveChannel, 
	getActiveChannelMessages } = channelsSlice.actions;

export default channelsSlice.reducer;

/*
	const channels = JSON.parse(localStorage.getItem('channels'));
*/