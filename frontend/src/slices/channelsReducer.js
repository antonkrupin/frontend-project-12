import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	channels: JSON.parse(localStorage.getItem('channels')) || [],
	activeChannel: {},
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
