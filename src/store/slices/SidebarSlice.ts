import { createSlice } from '@reduxjs/toolkit';

export const SidebarSlice = createSlice({
  name: 'sidebarOpen',
  initialState: {
    isOpen: false,
  },
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggleBar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open, close, toggleBar } = SidebarSlice.actions;
