import { Box } from '@mui/material';
import { AppBarMenu, Footer, SideBar } from '../components';

export const NotesLayout = ({ children }: any) => {
  return (
    <Box>
      {/* NavBar */}
      <AppBarMenu />
      {/* SideBar */}
      <SideBar />
      {/* Main */}
      <Box component='main' sx={{ p: 3, display: 'flex', flexDirection: 'column' , minHeight:'100vh' }}>
        {children}
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
};
