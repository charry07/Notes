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
      state.messageSaved = `${action?.payload?.title} Guardada Correctamente`;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state: any) => {
      state.isSaving = true;
    },
    updateNote: (state: any) => {
      state.isSaving = false;
      state.messageSaved = ` Actualizada Correctamente`;
    },
    deleteNote: (state: any, { payload }: any) => {
      state.isSaving = false;
      state.notes = state.notes.filter((note: any) => note.id !== payload);
      state.active = null;
      state.messageSaved = `${payload?.title} Se Elimino Correctamente`;
    },
    clearNotesLogout: (state: any) => {
      state.isSaving = false;
      state.notes = [];
      state.active = null;
      state.messageSaved = '';
    },
  },
});

export const { addNewEmptyNote, setActiveNote, setSaving, updateNote, deleteNote, setNotes, clearNotesLogout } = notesSlice.actions;
