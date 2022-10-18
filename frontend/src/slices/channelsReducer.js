import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	channels: [],
	activeChannel: {},
	renameChannelId: '',
	deleteChannelId: '',
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
		},
		renameChannelId: (state, action) => {
			state.renameChannelId = action.payload;
		},
		renameChannel: (state, action) => {
			const { id, name } = action.payload;
			state.channels.forEach((channel) => {
				if (channel.id === id) {
					channel.name = name;
				}
			});
			localStorage.setItem('channels', JSON.stringify(state.channels));
		},
		deleteChannelId: (state, action) => {
			state.deleteChannelId = action.payload;
		},
		deleteChannel: (state, action) => {
			const { id } = action.payload;
			state.channels.forEach((channel, index) => {
				if (channel.id === id) {
					state.channels.splice(index, 1);
				}
			});
			localStorage.setItem('channels', JSON.stringify(state.channels));
		},
	},
});

export const { 
	getChannels,
	setChannels,
	setActiveChannel,
	addChannel,
	renameChannelId,
	renameChannel,
	deleteChannelId,
	deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
