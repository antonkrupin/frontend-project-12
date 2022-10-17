import axios from 'axios';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

const initialState = {
	channels: [],
	activeChannel: {},
}

const getChannelsTest = createAsyncThunk(
	'channels',
	async () => {
		const userId = JSON.parse(localStorage.getItem('userId'));
		const header = { Authorization: `Bearer ${userId.token}` };
		const response = await axios.get('/api/v1/data', { headers: header});
		return response.data
	}
);

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
	},
	extraReducers: {
		[getChannelsTest.fulfilled]: (state, action) => {
			state.channels.push(action.payload);
		}
	}
});

export const { 
	getChannels,
	setChannels,
	setActiveChannel, 
} = channelsSlice.actions;

export default channelsSlice.reducer;
