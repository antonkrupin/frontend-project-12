import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: JSON.parse(localStorage.getItem('channels')),
	activeChannel: JSON.parse(localStorage.getItem('channels'))[0].name,
}

const channelsSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		getChannels: (state) => {
			const channels = JSON.parse(localStorage.getItem('channels'));
			state.value = channels;
		},
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload;
		},
	},
});

export const { getChannels, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

/*
	const channels = JSON.parse(localStorage.getItem('channels'));
*/