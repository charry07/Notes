import { CheckCircle, DeleteOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { startDeleteNote, startNewNote, startUpdateNote } from '../../store/Notes';
import { AppTextField } from '../components';

export const NoteView = () => {
  const { active, messageSaved, isSaving } = useSelector((state: any) => state.notes);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef<any>();

  const initialValues = {
    title: active ? active.title : '',
    body: active ? active.body : '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().min(8, String('Must Contain 8 Characters')).required('Enter your title'),
    body: Yup.string().min(20, String('Must Contain 20 Characters')).required('Enter your body'),
  });

  const conClickDelet = () => {
    dispatch(startDeleteNote());
    setOpen(true);
  };

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Formik
        validateOnChange
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          if (!active?.id) return dispatch(startNewNote(data)), setSubmitting(false), setOpen(true);
          dispatch(startUpdateNote(data));
          setSubmitting(false);
          setOpen(true);
        }}>
        {({ isValid, isSubmitting, setFieldValue, values }) => (
          <Form noValidate autoComplete='on'>
            <Grid container>
              <Grid container justifyContent='space-between'>
                <Grid item xs={6}>
                  <Typography variant='h4'>{active.date}</Typography>
                </Grid>
                <Grid display='contents' item xs={6}>
                  {!!active?.id && (
                    <Grid item title='Eliminar Nota'>
                      <Button color='error' sx={{ p: 2 }} variant='outlined' onClick={conClickDelet} disabled={!isValid || isSubmitting}>
                        <DeleteOutlined />
                      </Button>
                    </Grid>
                  )}
                  <Grid item title='Subir Imagenes'>
                    <input type='file' multiple ref={fileInputRef} onChange={({ target }: any) => console.log(target.files)} style={{ display: 'none' }} />
                    <Button color='secondary' sx={{ p: 2 }} onClick={() => fileInputRef.current.click()} variant='outlined' disabled={!isValid || isSubmitting || isSaving}>
                      <UploadOutlined />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color='primary' sx={{ p: 2 }} variant='outlined' type='submit' disabled={!isValid || isSubmitting}>
                      <SaveOutlined />
                      <Typography sx={{ ml: 1 }}>{!active?.id ? 'Guardar' : 'Actualizar'}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <AppTextField
                fullWidth
                required
                type='text'
                placeholder='Ingresa titulo'
                label='Ingresa el titulo'
                name='title'
                variant='filled'
                // defaultValue={active && active.title}
                sx={{ my: 2 }}
                onChange={({ target }: any) => setFieldValue('title', target.value)}
              />

              <AppTextField
                multiline
                fullWidth
                minRows={5}
                name='body'
                type='text'
                variant='filled'
                placeholder='Cual Nota quieres dejar ?'
                label='Cual Nota quieres dejar ?'
                required
                // defaultValue={active && active.title}
                sx={{ mb: 2 }}
                onChange={({ target }: any) => setFieldValue('body', target.value)}
              />

              {/* {errorMessage && <Alert severity='error' sx={{mt:1}}>{errorMessage}</Alert>} */}
            </Grid>
          </Form>
        )}
      </Formik>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box>
          <Typography sx={{ mt: 2 }} justifyContent='center' alignItems='center' display='flex'>
            <CheckCircle /> {messageSaved}
          </Typography>
        </Box>
      </Dialog>
    </Grid>
  );
};
