import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import { injectStyle } from 'react-toastify/dist/inject-style';

import SocketContext from './contexts/socketContext';
import App from './App';
import store from './slices/index';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('chat'));
const socket = socketIO.connect();

if (typeof window !== 'undefined') {
  injectStyle();
}

root.render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketContext.Provider>,
);
