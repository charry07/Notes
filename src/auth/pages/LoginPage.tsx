import { AccountCircle, Google } from '@mui/icons-material';
import { Alert, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  const { status, email, displayName, photoURL, uid, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const onGoogleSignIn = async () => {
    dispatch(checkingCredentials());
    const { email, displayName, photoURL, uid, errorMessage }: any = await loginWithGoogle();
    if (errorMessage) return dispatch(logout({ errorMessage: errorMessage }));
    dispatch(login({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
    navigate('/');
  };

  useEffect(() => {
    dispatch(logout({ errorMessage: null }));
  }, []);

  return (
    <AuthLayout title='Login'>
      <Formik
        validateOnChange
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(checkingCredentials());
          const { email, displayName, uid, photoURL, errorMessage } = await loginWithEmail({ email: data.email, password: data.password });
          if (errorMessage) return dispatch(logout({ errorMessage: errorMessage }));
          dispatch(login({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
          navigate('/');
          setSubmitting(false);
        }}>
        {({ isValid, isSubmitting, setFieldValue, values }) => (
          <Form noValidate autoComplete='on'>
            <Grid container  >
              <TextField
                fullWidth
                required
                sx={{ mt: 2 }}
                name='email'
                type='email'
                label='Email '
                placeholder='example@gmail.com'
                onChange={({ target }: any) => setFieldValue('email', target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                sx={{ mt: 1.2 }}
                name='password'
                type='password'
                label='Password'
                placeholder='Password'
                onChange={({ target }: any) => setFieldValue('password', target.value)}
              />
            </Grid>
            {errorMessage && <Alert severity='error' sx={{mt:1}}>{errorMessage}</Alert>}

            <Grid container sx={{ mt: 0 }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant='contained' type='submit' disabled={isSubmitting || status == 'checking'}>
                  <Typography>Login</Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant='outlined' onClick={onGoogleSignIn} disabled={isSubmitting || status == 'checking'}>
                  <Google /> <Typography sx={{ ml: 2 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent='end' sx={{ mt: 2 }}>
              <Link to='/auth/register'>Crear una Cuenta</Link>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
