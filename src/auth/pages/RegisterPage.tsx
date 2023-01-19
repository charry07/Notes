import { AccountCircle } from '@mui/icons-material';
import { Alert, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerUserWithEmail } from '../../firebase/providers';
import { AppTextField } from '../../NotesApp/components';
import { checkingCredentials, login, logout } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  const { status, email, displayName, photoURL, uid, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-])(?=.{8,})/,
        // 'Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password'),
    username: Yup.string().min(8, String('Must Contain 8 Characters')).required('Enter your name'),
    email: Yup.string().email(String('Check the email')).required(String('Enter your email')),
  });

  useEffect(() => {
    dispatch(logout({ errorMessage: null }));
  }, []);

  return (
    <AuthLayout title='Register' initialValues={initialValues}>
      <Formik
        validateOnChange
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(checkingCredentials());
          const { email, displayName, uid, photoURL, errorMessage } = await registerUserWithEmail({ email: data.email, password: data.password, displayName: data.username });
          if (errorMessage) return dispatch(logout({ errorMessage: errorMessage }));
          dispatch(login({ email: email, displayName: displayName, uid: uid, photoURL: photoURL }));
          navigate('/');
          setSubmitting(false);
        }}>
        {({ isValid, isSubmitting, setFieldValue, values }) => (
          <Form noValidate autoComplete='on'>
            <Grid container>
              <AppTextField
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
              <AppTextField
                fullWidth
                required
                sx={{ mt: 1.2 }}
                name='password'
                type='password'
                label='Password'
                placeholder='Password'
                onChange={({ target }: any) => setFieldValue('password', target.value)}
              />
              <AppTextField
                fullWidth
                required
                sx={{ mt: 1.2 }}
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='Confirm Password'
                onChange={({ target }: any) => setFieldValue('confirmPassword', target.value)}
              />
            </Grid>
            <AppTextField
              fullWidth
              required
              sx={{ mt: 1.2 }}
              name='username'
              type='text'
              label='Username'
              placeholder='Username'
              onChange={({ target }: any) => setFieldValue('username', target.value)}
            />
            {errorMessage && <Alert severity='error' sx={{mt:1}}>{errorMessage}</Alert>}

            <Button fullWidth variant='contained' sx={{ mt: 2 }} type='submit' disabled={status == 'checking' || !isValid}>
              <Typography>Register</Typography>
            </Button>
            <Grid container justifyContent='end' sx={{ mt: 2 }}>
              <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
              <Link to='/auth/login'>
                <Typography>Login</Typography>
              </Link>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
