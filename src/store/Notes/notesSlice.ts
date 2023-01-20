import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    addNewEmptyNote: (state: any, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state,action) => {
        state.active = action.payload
    },
    setNotes: (state, {payload}) => {
        state.notes = payload;
    },
    setSaving: (state: any) => {
      state.isSaving = true;
    },
    updateNote: (state: any) => {
      state.isSaving = false;
    },
    deleteNote: (state: any, { payload }: any) => {},
  },
});

export const { addNewEmptyNote, setActiveNote, setSaving, updateNote, deleteNote  , setNotes} = notesSlice.actions;
