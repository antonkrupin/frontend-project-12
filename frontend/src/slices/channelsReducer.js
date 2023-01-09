/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  loadingChannelsStatus: null,
  error: null,
  channelStatus: null,
  activeChannel: {},
  channelForRename: {},
  channelForDelete: {},
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId'));
      const header = { Authorization: `Bearer ${userId.token}` };
      const response = await axios.get('/api/v1/data', { headers: header });
      const { channels } = response.data;
      return channels;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelStatus: (state, action) => {
      state.channelStatus = action.payload;
    },
    setActiveChannel: (state, action) => {
      const { name, id } = action.payload;
      const activeId = state.activeChannel.id;
      if (name) {
        state.activeChannel = action.payload;
      } else if (id === activeId) [state.activeChannel] = [...state.channels];
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
      localStorage.setItem('channels', JSON.stringify(state.channels));
      state.channelStatus = null;
    },
    channelForRename: (state, action) => {
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
      localStorage.setItem('channels', JSON.stringify(state.channels));
    },
  },
  extraReducers: {
    [fetchChannels.pending]: (state) => {
      state.loadingChannelsStatus = 'loading';
      state.error = null;
    },
    [fetchChannels.fulfilled]: (state, action) => {
      state.loadingChannelsStatus = 'resolved';
      state.channels = action.payload;
      [state.activeChannel] = action.payload;
    },
    [fetchChannels.rejected]: (state, action) => {
      state.loadingChannelsStatus = 'rejected';
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
