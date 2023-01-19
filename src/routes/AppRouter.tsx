import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { NotesRoutes } from '../NotesApp/routes/NotesRoutes';

export const AppRouter = () => {
  const { status } = useSelector((state: any) => state.auth);

  return (
    <Routes>
      {/* login y register ->  solo va a existir si el Usuario no esta autenticado */}
      {status !== 'authenticated' && <Route path='auth/*' element={<AuthRoutes />} />}

      {/* Notes App */}
      {status === 'authenticated' && <Route path='/*' element={<NotesRoutes />} />}
    </Routes>
  );
};
