import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { NotesLayout } from '../layout/NotesLayout';
import { NoteView, NothingSelectedView } from '../views';

export const NotesPage = () => {
  return (
    <NotesLayout>
      {/* <NothingSelectedView></NothingSelectedView> */}
      <NoteView></NoteView>
      <IconButton size='large' sx={{ border: '1px solid white', backgroundColor: 'primary.main', position: 'fixed', right: 50, bottom: 60 }}>
        <AddOutlined />
      </IconButton>
    </NotesLayout>
  );
};
