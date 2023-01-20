import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { startUpdateNote } from '../../store/Notes';
import { AppTextField } from '../components';

export const NoteView = () => {
  const { active } = useSelector((state: any) => state.notes);
  const dispatch = useDispatch();

  const initialValues = {
    title: active ? active.title : '',
    body: active ? active.body : '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().min(8, String('Must Contain 8 Characters')).required('Enter your title'),
    body: Yup.string().min(20, String('Must Contain 20 Characters')).required('Enter your body'),
  });

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Formik
        validateOnChange
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(startUpdateNote(data));
          setSubmitting(false);
        }}>
        {({ isValid, isSubmitting, setFieldValue, values }) => (
          <Form noValidate autoComplete='on'>
            <Grid container>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <Typography variant='h4'>{active.date}</Typography>
                </Grid>
                <Grid item>
                  <Button color='primary' sx={{ p: 2 }} variant='outlined' type='submit' disabled={!isValid || isSubmitting}>
                    <SaveOutlined />
                    <Typography sx={{ ml: 1 }}>Guardar</Typography>
                  </Button>
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
    </Grid>
  );
};
