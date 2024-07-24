/* eslint-disable import/order */
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Button } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// components
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Iconify from '../../../components/iconify';
import { useDispatch } from 'react-redux';
import { POST_ADMIN_SIGNIN_REQUEST } from '../action/action';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function LoginForm() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Required')
      .matches(/^\S*$/, 'Spaces are not allowed')
      .matches(/^\S+@\S+\.\S+$/, 'Please provide a proper email')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Required')
      .matches(/^.{5,}$/, 'Must contain 5 characters'),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch({
            type: POST_ADMIN_SIGNIN_REQUEST,
            payload: {
              email: values.email,
              password: values.password,
              navigate
            },
          });
        }}
      >
        {({ errors, touched, values }) => (
          <div className="login">
            <Form>
              <Stack spacing={3}>
                  <Field
                    name="email"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email address"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        id="outlined-basic"
                        name="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    )}
                  />
                <Field
                  name="password"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Stack>
              <div className="loginBtn" style={{ marginTop: '5%', marginLeft: '80%' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!values.email || !values.password}
                  // onClick={handleClick}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
