import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/Notes';
import { NotesLayout } from '../layout/NotesLayout';
import { NoteView, NothingSelectedView } from '../views';

export const NotesPage = () => {
  const { isSaving, active } = useSelector((state: any) => state.notes);
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <NotesLayout>
      {active ? <NoteView /> : <NothingSelectedView />}
      {active?.id != '' && active?.title != '' && active?.body != '' && (
        <IconButton
          title='Agregar nueva nota'
          disabled={isSaving}
          size='large'
          onClick={onClickNewNote}
          sx={{ border: '2px solid white', backgroundColor: 'primary.main', position: 'fixed', right: 50, bottom: 60 }}>
          <AddOutlined />
        </IconButton>
      )}
    </NotesLayout>
  );
};
