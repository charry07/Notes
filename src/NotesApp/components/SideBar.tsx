import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../store/slices';
import { SideBarItem } from './SideBarItem';

export const SideBar = () => {
  const { isOpen } = useSelector((state: any) => state.sidebarOpen);
  const dispatch = useDispatch();

  const toggleBar = (action: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    action ? dispatch(open()) : dispatch(close());
  };

  return (
    <Box>
      {/* <Button onClick={toggleBar(true)}>Open SideBar</Button> */}
      <Drawer anchor='left' open={isOpen} onClose={toggleBar(false)}>
        <SideBarItem />
      </Drawer>
    </Box>
  );
};
