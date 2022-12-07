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
  setActiveChannel,
  renameChannel,
  deleteChannel,
} from './slices/channelsReducer';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('chat'));
const socket = socketIO.connect();

if (typeof window !== 'undefined') {
  injectStyle();
}

const runApp = () => {
  const { dispatch } = store;

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(setActiveChannel(payload));
    dispatch(addChannel(payload));
    dispatch(setChannelStatus('added'));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
    dispatch(setChannelStatus('renamed'));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(deleteChannel(payload));
    dispatch(setChannelStatus(null));
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
