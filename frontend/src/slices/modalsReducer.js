/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  isModalShow: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalShow: (state) => {
      state.isModalShow = !state.isModalShow;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
  },
});

export const {
  setModalShow,
  setModalType,
} = modalsSlice.actions;

export default modalsSlice.reducer;
