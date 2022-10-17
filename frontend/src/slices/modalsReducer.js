import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAddChannelModalShow: false,
	isDeleteChannelModalShow: false,
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		addChannelModalShow: (state, action) => {
			state.isAddChannelModalShow = !state.isAddChannelModalShow;
		},
		deleteChannelModalShow: (state, action) => {
			state.isDeleteChannelModalShow = !state.isAddChannelModalShow;
		}
	}
});

export const {
	addChannelModalShow,
	deleteChannelModalShow,
} = modalsSlice.actions;

export default modalsSlice.reducer;

