import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingNotes } from '../../store/Notes';
import { AppBarMenu, Footer, SideBar } from '../components';

export const NotesLayout = ({ children }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingNotes());
  }, []);

  return (
    <Box>
      {/* NavBar */}
      <AppBarMenu />
      {/* SideBar */}
      <SideBar />
      {/* Main */}
      <Box component='main' sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {children}
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
};
