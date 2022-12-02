/* eslint-disable no-param-reassign */
import _ from 'lodash';
import axios from 'axios';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  username: '',
  messagesStatus: null,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const header = { Authorization: `Bearer ${userId.token}` };

    const response = await axios.get('/api/v1/data', { headers: header });

    const { messages } = response.data;

    return messages;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    deleteMessages: (state, action) => {
      const { channelId } = action.payload;
      const result = [];
      state.messages.forEach((message) => {
        if (message.channelId === channelId) {
          result.push(current(message));
        }
      });
      const difference = _.differenceBy(current(state.messages), result, 'channelId');
      state.messages = difference;
      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.messagesStatus = 'loading';
      state.error = null;
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.messagesStatus = 'resolved';
      state.messages = action.payload;
    },
  },
});

export const {
  addMessage,
  setUserName,
  deleteMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
