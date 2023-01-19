import { StarOutline, StarOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Grid container sx={{ borderRadius: 3, backgroundColor: 'secondary.main', minHeight: '100vh' }} direction='column' justifyContent='center' alignItems='center'>
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Selecciona una entrada</Typography>
      </Grid>
    </Grid>
  );
};
