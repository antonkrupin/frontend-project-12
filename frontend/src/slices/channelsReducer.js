import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	channels: [],
	fetchChannelsStatus: null,
	error: null,
	channelStatus: null,
	activeChannel: {},
	channelForRename: {},
	channelForDelete: {},
}

export const fetchChannels = createAsyncThunk(
	'channels/fetchChannels',
	async function(_, {rejectWithValue}) {
		try {
			const userId = JSON.parse(localStorage.getItem('userId'));
			const header = { Authorization: `Bearer ${userId.token}` };
			const response = await axios.get('/api/v1/data', { headers: header});
			if(response.status !== 200) {
				throw new Error('Server Error!');
			}
			const channels = response.data.channels;
			return channels;
		} catch (error) {	
				return rejectWithValue(error.message);
		}
	}
);

const channelsSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		setChannelStatus: (state, action) => {
			state.channelStatus = action.payload;
		},
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload;
		},
		addChannel: (state, action) => {
			state.channels.push(action.payload);
			localStorage.setItem('channels', JSON.stringify(state.channels));
			state.channelStatus = null;
		},
		channelForRename: (state, action) => {
			//state.channelStatus = null;
			state.channelForRename = action.payload;
		},
		renameChannel: (state, action) => {
			const { id, name } = action.payload;
			state.channels.forEach((channel) => {
				if (channel.id === id) {
					channel.name = name;
				}
			});
			localStorage.setItem('channels', JSON.stringify(state.channels));
			state.channelStatus = null;
		},
		channelForDelete: (state, action) => {
			state.channelForDelete = action.payload;
		},
		deleteChannel: (state, action) => {
			const { id } = action.payload;
			state.channels.forEach((channel, index) => {
				if (channel.id === id) {
					state.channels.splice(index, 1);
				}
			});
			//придумать что то с активным каналом
			//state.activeChannel = state.channels[0];
			localStorage.setItem('channels', JSON.stringify(state.channels));
		},
	},
	extraReducers: {
		[fetchChannels.pending]: (state) => {
			state.fetchChannelsStatus = 'loading';
			state.error = null;
		},
		[fetchChannels.fulfilled]: (state, action) => {
			state.fetchChannelsStatus = 'resolved';
			state.channels = action.payload;
			state.activeChannel = action.payload[0];
		},
		[fetchChannels.rejected]: (state, action) => {
			state.fetchChannelsStatus = 'rejected';
			state.error = action.payload;
		},
	},
});

export const { 
	setChannelStatus,
	setActiveChannel,
	addChannel,
	channelForRename,
	renameChannel,
	channelForDelete,
	deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
