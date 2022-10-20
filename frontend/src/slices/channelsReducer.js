import axios from 'axios';
import { createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';

const initialState = {
	channels: [],
	fetchChannelsStatus: null,
	error: null,
	activeChannel: {},
	renameChannelId: '',
	renameChannelStatus: null,
	deleteChannelId: '',
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
		/*getChannels: (state) => {
			state.channels = JSON.parse(localStorage.getItem('channels'));
		},*/
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload;
		},
		addChannel: (state, action) => {
			state.channels.push(action.payload);
			localStorage.setItem('channels', JSON.stringify(state.channels));
		},
		renameChannelId: (state, action) => {
			state.renameChannelId = action.payload;
			state.renameChannelStatus = 'renaming';
		},
		renameChannel: (state, action) => {
			state.renameChannelStatus = 'renamed';
			const { id, name } = action.payload;
			state.channels.forEach((channel) => {
				if (channel.id === id) {
					channel.name = name;
				}
			});
			localStorage.setItem('channels', JSON.stringify(state.channels));
			state.renameChannelStatus = null;
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
	//getChannels,
	setActiveChannel,
	addChannel,
	renameChannelId,
	renameChannel,
	deleteChannelId,
	deleteChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
