import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutMe, NotesPage, Profile } from '../pages';
import { PokemonPage } from '../pages/PokemonPage';

export const NotesRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<NotesPage />} />
      <Route path='/AboutMe' element={<AboutMe />} />
      <Route path='/Profile' element={<Profile />} />
      <Route path='/API/Pokemon' element={<PokemonPage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};
