import React from 'react';
import ReactDOM from 'react-dom/client';
import socketIO from 'socket.io-client';
import { Provider } from 'react-redux';
import { injectStyle } from 'react-toastify/dist/inject-style';

import SocketContext from './contexts/socketContext';
import App from './App';
import store from './slices/index';

import {
  addMessage,
} from './slices/messagesReducer.js';

import {
  setChannelStatus,
  addChannel,
  renameChannel,
  deleteChannel,
  setActiveChannel,
} from './slices/channelsReducer';

const runApp = () => {
  const { dispatch } = store;

  const root = ReactDOM.createRoot(document.getElementById('chat'));

  const socket = socketIO.connect();

  if (typeof window !== 'undefined') {
    injectStyle();
  }

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
    dispatch(setChannelStatus('added'));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
    dispatch(setChannelStatus('renamed'));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(deleteChannel(payload));
    dispatch(setActiveChannel(payload));
    dispatch(setChannelStatus('deleted'));
  });

  root.render(
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContext.Provider>,
  );
};

export default runApp;
