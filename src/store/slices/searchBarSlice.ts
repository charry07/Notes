import { createSlice } from '@reduxjs/toolkit';

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState: {
    value: '',
  },
  reducers: {
    onChange: (state, action) => {
      state.value = action.payload.value;
    },
  },
});

export const { onChange } = searchBarSlice.actions;
