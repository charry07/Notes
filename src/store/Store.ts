import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { notesSlice } from './Notes';
import { pokemonSlice, searchBarSlice, SidebarSlice } from './slices';

export default configureStore({
  reducer: {
    sidebarOpen: SidebarSlice.reducer,
    pokemon: pokemonSlice.reducer,
    searchBar: searchBarSlice.reducer,
    auth: authSlice.reducer,
    notes: notesSlice.reducer,
  },
});


