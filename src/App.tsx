import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuth } from './firebase/config';
import { loading } from './loading/loading';
import { Loader } from './NotesApp/components';
import { AppRouter } from './routes/AppRouter';
import { login } from './store/auth';
import { AppTheme } from './theme';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // con esto al recargar el navegador NO se pierden las credenciales del "Usuario"
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return navigate('/auth/login');
      dispatch(login({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
    });
  }, []);

  return (
    <AppTheme>
      {loading() && <Loader />}
      <AppRouter />
    </AppTheme>
  );
}

export default App;
