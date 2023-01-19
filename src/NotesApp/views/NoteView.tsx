import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { ImageGalery } from '../components';

export const NoteView = () => {
  const navigate = useNavigate();
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Grid item>
        <Typography variant='h4'>28 Agosto 2023</Typography>
      </Grid>
      
      {/* Pokemon aPI  */}
      <Grid item>
        <Button color='primary' sx={{ p: 2 }} variant='outlined' onClick={() => navigate('/API/Pokemon')}>
          <SaveOutlined />
          <Typography sx={{ ml: 1 }}>Abrir API POKEMON</Typography>
        </Button>
      </Grid>


      <Grid item>
        <Button color='primary' sx={{ p: 2 }} variant='outlined'>
          <SaveOutlined />
          <Typography sx={{ ml: 1 }}>Guardar</Typography>
        </Button>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <TextField fullWidth type='text' variant='filled' placeholder='Ingresa titulo' label='Titulo' sx={{ mb: 2 }} />
        <TextField multiline fullWidth minRows={5} type='text' variant='filled' placeholder='Cual Nota quieres dejar ?' label='Cual Nota quieres dejar ?' />
        <ImageGalery />
      </Grid>
    </Grid>
  );
};
