import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from '../slices/channelsReducer.js';
import messagesReducer from './messagesReducer.js';
import modalsReducer from './modalsReducer.js';


export default configureStore({
	reducer: {
		channels: channelsReducer,
		messages: messagesReducer,
		modals: modalsReducer,
	},
});