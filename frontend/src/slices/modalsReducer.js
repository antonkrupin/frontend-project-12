import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAddChannelModalShow: false,
	isDeleteChannelModalShow: false,
	isRenameChannelModalShow: false,
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		addChannelModalShow: (state, action) => {
			state.isAddChannelModalShow = !state.isAddChannelModalShow;
		},
		deleteChannelModalShow: (state, action) => {
			state.isDeleteChannelModalShow = !state.isDeleteChannelModalShow;
		},
		renameChannelModalShow: (state, action) => {
			state.isRenameChannelModalShow = !state.isRenameChannelModalShow;
		},
	}
});

export const {
	addChannelModalShow,
	deleteChannelModalShow,
	renameChannelModalShow,
} = modalsSlice.actions;

export default modalsSlice.reducer;

