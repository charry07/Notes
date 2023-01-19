import { Box, useTheme } from '@mui/material';

export const Loader = () => {
  var theme = useTheme().palette.primary.main;
  return (
    <Box
      sx={{
        zIndex: 1,
        width: '80px',
        height: '80px',
        position: 'absolute',
        top: { xs: '35%', md: '50%' },
        left: '50%',
        marginTop: { xs: '-35px', md: '-50px' },
        marginLeft: '-50px',
        borderRadius: '50%',
        border: `10px solid ${theme}`,
        borderTopColor: 'transparent',
        animation: 'spin 1.2s linear infinite',
        '@keyframes spin': {
          to: {
            transform: 'rotate(360deg)',
          },
        },
      }}
    />
  );
};
