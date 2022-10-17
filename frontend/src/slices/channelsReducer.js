import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	channels: [],
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
		addChannel: (state, action) => {
			state.channels.push(action.payload);
			localStorage.setItem('channels', JSON.stringify(state.channels));
			//localStorage.setItem('channels', JSON.stringify(data.data.channels));
		},
	},
});

export const { 
	getChannels,
	setChannels,
	setActiveChannel,
	addChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
