import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  isAddChannelModalShow: false,
  isDeleteChannelModalShow: false,
  isRenameChannelModalShow: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    addChannelModalShow: (state) => {
      state.modalType = 'add';
      state.isAddChannelModalShow = !state.isAddChannelModalShow;
    },
    deleteChannelModalShow: (state) => {
      state.modalType = 'delete';
      state.isDeleteChannelModalShow = !state.isDeleteChannelModalShow;
    },
    renameChannelModalShow: (state) => {
      state.modalType = 'rename';
      state.isRenameChannelModalShow = !state.isRenameChannelModalShow;
    },
    changeModalType: (state, action) => {
      state.modalType = action.payload;
    },
  },
});

export const {
  addChannelModalShow,
  deleteChannelModalShow,
  renameChannelModalShow,
  changeModalType,
} = modalsSlice.actions;

export default modalsSlice.reducer;
