import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotesLayout } from '../layout/NotesLayout';
import Profile from '/profile.png';

export const AboutMe = () => {


  return (
    <NotesLayout>
      <Box>
        <img src={Profile} alt='perfil' width={800} />
      </Box>
    </NotesLayout>
  );
};
