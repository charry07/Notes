import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutFirebase } from '../../firebase/providers';
import { logout } from '../../store/auth';
import { toggleBar } from '../../store/slices';
import { SearchBar } from './SearchBar';

export const AppBarMenu = (props: any) => {
  const { displayName, photoURL } = useSelector((state: any) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/Profile');
  };
  const handleAboutMe = () => {
    setAnchorEl(null);
    navigate('/AboutMe');
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout({ errorMessage: null }));
    logoutFirebase();
    navigate('/auth/login');
  };

  const onClickMarvel = () => {
    props.isMarvel(true);
    navigate('/Marvel');
  };
  const onClickDC = () => {
    props.isMarvel(false);
    navigate('/DC');
  };
  const onClickDev = () => {
    // props.isMarvel(true);
    navigate('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <MenuItem onClick={handleAboutMe}>About Me</MenuItem>
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>
        {' '}
        <LogoutOutlined sx={{ mr: 1, color: 'primary.main' }} /> Log Out
      </MenuItem>
    </Menu>
  );

  return location.pathname !== '/auth/login' ? (
    <Box sx={{ width: '100%' }}>
      <AppBar position='static'>
        <Toolbar>
          {location.pathname !== '/' ? (
            <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' onClick={onClickDev} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          {location.pathname == '/' ? (
            <IconButton edge='start' onClick={() => dispatch(toggleBar())}>
              <MenuOutlined />
            </IconButton>
          ) : null}
          <Typography variant='h6' onClick={onClickDev} sx={{ display: { xs: 'none', sm: 'flex' }, cursor: 'pointer', mx: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {displayName ? displayName : 'ACharryDev'}
          </Typography>

          {/* {location.pathname === '/' || location.pathname === '/Marvel' || location.pathname === '/DC' ? (
            <>
              <MenuItem onClick={onClickMarvel}>
                <Typography textAlign='center'>Marvel</Typography>
              </MenuItem>
              <MenuItem onClick={onClickDC}>
                <Typography textAlign='center'>DC</Typography>
              </MenuItem>
            </>
          ) : null} */}

          {/* <SearchBar inputSearch={(e: string) => props.inputSearch(e)} /> */}
          <Box sx={{ mr: 1 }} />
          <IconButton
            size='large'
            sx={{ position: 'absolute', right: 0 }}
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'>
            <Avatar src={photoURL} alt={displayName} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  ) : null;
};
