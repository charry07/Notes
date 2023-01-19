import { AccountCircle, Google } from '@mui/icons-material';
import { Grid, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

export const AuthLayout = ({ children, title }: any) => {
  return (
    <Grid container direction='column' alignContent='center' alignItems='center' sx={{ minHeight: '100vh', backgroundColor: 'primary.main', p: 4 }}>
      <Grid item sx={{ boxShadow: 15, backgroundColor: 'white', p: 3, borderRadius: 2, width: { sm: 500 }, mt: { xs: 10, md: 30 } }}>
        <Typography variant='h4'>{title}</Typography>
        {children}
      </Grid>
    </Grid>
  );
};
