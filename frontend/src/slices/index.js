import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channelsReducer.js';

export default configureStore({
	reducer: {
		channels: channelsReducer,
	},
});