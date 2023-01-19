import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotesLayout } from '../layout/NotesLayout';

export const Profile = () => {
  const {displayName } = useSelector((state: any) => state.auth);
  return (
    <NotesLayout>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        Hola <h3>{displayName}</h3> gracias por probar la app!
      </span>
    </NotesLayout>
  );
};
