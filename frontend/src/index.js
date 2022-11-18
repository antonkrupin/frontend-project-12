import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import reportWebVitals from './reportWebVitals';

import App from './App';
import store from './slices/index';

import { injectStyle } from "react-toastify/dist/inject-style";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('chat'));
const socket = socketIO.connect();

if (typeof window !== "undefined") {
  injectStyle();
}

root.render(
	<Provider store={store}>
		<App socket={socket}/>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
