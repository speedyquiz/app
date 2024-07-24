/* eslint-disable react/prop-types */
// UserProfileModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Grid, TextField, CircularProgress, InputLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
// import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import 'moment-timezone';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {
  CREATE_MEMBER_REQUEST,
  GET_MEMBER_BY_ID_REQUEST,
  GET_MEMBER_DATA_REQUEST,
  UPDATE_MEMBER_BY_ID_REQUEST,
  updateMemberFromList,
  createNewMemberData,
  getUserDataByUserId,
  getUserBySearchData
} from '../action/action';

const MemberProfileModal = ({ isOpen, onClose, memberId, isEdit }) => {
  const dispatch = useDispatch();
  //
  const [isLoading, setIsLoading] = useState(false);
  const [memberDataById, setMemberDataById] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [checkLoader, setCheckLoader] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [serverDate, setServerDate] = useState('');
  //
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    dob: Yup.string()
      .max(new Date(), 'Date of birth cannot be in the future')
      .required('Required')
      .test('dob', 'Must be at least 18 years old', (value) => {
        //
       
        const currentDate = new Date();
        // const userDate = new Date(value);
        
        // Calculate age in years
        const age = currentDate.getFullYear() - moment(value,"DD/MM/YYYY").year()
        // userDate.getFullYear();
        // Check if the user is at least 18 years old
        return age >= 18;
      }),
    email: Yup.string().email('Invalid email format').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format').required('Required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 8 characters').required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  });
  useEffect(() => {
    if (memberId) {
      dispatch(
        getUserDataByUserId({
          reqData: {
            'userId': memberId
          },
          onSuccessData: (responseData) => {
            setMemberDataById(responseData.data)
            setIsVisible(true)
            console.log(JSON.stringify(responseData?.data?.dob));
            setStartDate(new Date(responseData?.data?.dob))
          },
          onErrorData: (error) => {
          }
        })
      )
    } else {
      setIsVisible(true)
    }
  }, [memberId])
  // useEffect(() => {
  //   if (memberId) {
  //     dispatch({
  //       type: GET_MEMBER_BY_ID_REQUEST,
  //       payload: memberId,
  //     });
  //   }
  // }, [dispatch, memberId]);

  const dob = new Date(memberDataById?.dob);

  // Get the day, month, and year components
  const day = dob.getDate();
  const month = dob.getMonth() + 1; // Months are zero-based
  const year = dob.getFullYear();

  // Format the date as 'dd/mm/yyyy'
  const formattedDate = `${day}/${month}/${year}`;
  // alert(formattedDate)
  return (
    <Modal open={isOpen} onClose={() => { onClose(0) }}>
      {isLoading ? ( // Display loader if isLoading is true
        null  // Replace with your loader component
      ) :
        (
          <>


            {
              // (Object.keys(memberDataById).length > 0) &&
              isVisible &&
              <Formik
                initialValues={{
                  name: memberDataById?.name,
                  dob: memberId ? formattedDate || '' : '',
                  email: memberId ? memberDataById?.email || '' : '',
                  phone: memberId ? memberDataById?.phone || '' : '',
                  username: memberId ? memberDataById?.username || '' : '',
                  password: memberId ? memberDataById?.password || '' : '',
                  city: memberId ? memberDataById?.city || '' : '',
                  country: memberId ? memberDataById?.country || '' : '',
                }}
                validationSchema={validationSchema}
                // onSubmit={(values, { setSubmitting }) => {
                //   dispatch({
                //     type: CREATE_MEMBER_REQUEST,
                //     payload: {
                //       username: values.username,
                //       email: values.email,
                //       name: values.name,
                //       password: values.password,
                //       phone: values.phone,
                //       dob: values.dob,
                //       city: values.city,
                //       country: values.country,
                //       device: values.device,
                //     },
                //   });
                //   onClose();

                //   // Reset form state
                //   setSubmitting(false);
                //   dispatch({
                //     type: GET_MEMBER_DATA_REQUEST,
                //   });
                // }}
                onSubmit={(values, { setSubmitting }) => {
                  // Determine whether it's an update by comparing initial values with current categoryData
                  const isUpdating =
                    memberId &&
                    (memberDataById?.name !== values.name ||
                      memberDataById?.phone !== values.phone ||
                      memberDataById?.dob !== values.dob ||
                      memberDataById?.city !== values.city ||
                      memberDataById?.country !== values.country);
                  // ||
                  // memberDataById?.device !== values.device);
                  // setIsLoading(true)
                  setCheckLoader(true)
                  if (isUpdating) {
                    // If it's an update, dispatch update action
                    const bodyFormData = new FormData();
                    bodyFormData.append('name', values.name);
                    bodyFormData.append('dob', moment(values.dob).format('yyyy-MM-DD'));// yyyy-mm-dd
                    bodyFormData.append('city', values.city);
                    bodyFormData.append('country', values.country);
                    bodyFormData.append('phone', values.phone);
                    //
                    dispatch(
                      updateMemberFromList({
                        reqData: {
                          'userId': memberId,
                          'formData': bodyFormData
                        },
                        onSuccessData: (responseData) => {
                          if (responseData?.message === undefined) {
                            alert('Error in Profile');
                          } else {
                            alert(responseData?.message);
                          }

                          setCheckLoader(false)
                          // setIsLoading(false);
                          onClose(1);
                        },
                        onErrorData: (error) => {

                        }
                      })
                    )
                    // dispatch({
                    //   type: UPDATE_MEMBER_BY_ID_REQUEST,
                    //   payload: {
                    //     memberId,
                    //     name: values.name,
                    //     phone: values.phone,
                    //     dob: values.dob,
                    //     city: values.city,
                    //     country: values.country,
                    //     device: "null",// values.device,
                    //   },
                    // });
                  } else {
                    // If it's not an update, dispatch create action
                    //
                    dispatch(
                      createNewMemberData({
                        reqData: {
                          "username": values.username,
                          "email": values.email,
                          "name": values.name,
                          "password": values.password,
                          "phone": values.phone,
                          "dob": moment(values.dob).format('yyyy-MM-DD'),
                          "city": values.city,
                          "country": values.country,
                          "device": "null"
                        },
                        onSuccessData: (responseData) => {
                          if (responseData?.message === undefined) {
                            alert('Error in Profile');
                          } else {
                            alert(responseData?.message);
                          }
                          setCheckLoader(false)
                          onClose(1);
                        },
                        onErrorData: (error) => {
                          console.log("error == ",JSON.stringify(error));
                        }
                      })
                    )
                  }

                  // Close the modal after submitting
                  // onClose();

                  // Reset form state
                  setSubmitting(false);
                  // dispatch({
                  //   type: GET_MEMBER_DATA_REQUEST,
                  // });
                }}
              >
                {({ errors, touched, handleChange, setFieldValue }) => (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'white',
                      p: 4,
                      width: 1000,
                    }}
                  >
                    <Form>
                      {/* <PersonIcon sx={{ fontSize: 100, marginX: 50 }} /> */}
                      <Grid container spacing={2} alignItems="center" justify="center">
                        <Grid item xs={6} md={6}>
                          <Field
                            name="name"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Full Name"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                name="name"
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                disabled={!isEdit}
                              />
                            )}
                          />
                        </Grid>
                        {/* <DatePicker
                            // showIcon
                            toggleCalendarOnIconClick
                            selected={startDate}
                            onSelect={(date) => { }} // when day is clicked
                            onChange={(date) => { }} // only when value has changed

                          /> */}
                        <Grid item xs={6} md={6}>
                          <Field
                            name="dob"
                            render={({ field }) => (
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                  label="Select Date"
                                  value={startDate}
                                  name="dob"
                                  onChange={(date) => {
                                    setStartDate(date)
                                    setFieldValue('dob', moment.utc(date).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss'))
                                    setServerDate(moment.utc(date).tz(moment.tz.guess()).format('YYYY-MM-DD'))

                                  }}
                                // renderInput={(params) => <TextField {...params} name="dob"onChange={handleChange} />}
                                />
                              </LocalizationProvider>
                            )}
                          />
                          {
                            errors.dob &&
                            <InputLabel htmlFor="my-input" style={{ color: 'red' }}>{errors.dob}</InputLabel>
                          }
                        </Grid>
                        {!memberId && (
                          <Grid item xs={6} md={6}>
                            <Field
                              name="email"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Email ID"
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  // disabled={memberId}
                                  id="outlined-basic"
                                  name="email"
                                  onChange={handleChange}
                                  error={touched.email && Boolean(errors.email)}
                                  helperText={touched.email && errors.email}
                                  disabled={!isEdit}
                                />
                              )}
                            />
                          </Grid>
                        )}
                        <Grid item xs={6} md={6}>
                          <Field
                            name="phone"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Phone No"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                name="phone"
                                onChange={handleChange}
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                                disabled={!isEdit}
                              />
                            )}
                          />
                        </Grid>
                        {!memberId && (
                          <>
                            <Grid item xs={6} md={6}>
                              <Field
                                name="username"
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    label="User Name"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    id="outlined-basic"
                                    name="username"
                                    onChange={handleChange}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    disabled={!isEdit}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Field
                                name="password"
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    label="Password"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    id="outlined-basic"
                                    name="password"
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    disabled={!isEdit}
                                  />
                                )}
                              />
                            </Grid>
                          </>
                        )}
                        <Grid item xs={6} md={6}>
                          <Field
                            name="city"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="City"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                name="city"
                                onChange={handleChange}
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                                disabled={!isEdit}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Field
                            name="country"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label="Country"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="outlined-basic"
                                name="country"
                                onChange={handleChange}
                                error={touched.country && Boolean(errors.country)}
                                helperText={touched.country && errors.country}
                                disabled={!isEdit}
                              />
                            )}
                          />
                        </Grid>
                        {/* <Grid item xs={6} md={6}>
                    <Field
                      name="device"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Device"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="outlined-basic"
                          name="device"
                          onChange={handleChange}
                          error={touched.device && Boolean(errors.device)}
                          helperText={touched.device && errors.device}
                        />
                      )}
                    />
                  </Grid> */}
                        {
                          !isEdit &&
                          <Grid item xs={6} md={6}>
                            <Field
                              name="email"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Email"
                                  margin="normal"
                                  variant="outlined"
                                  fullWidth
                                  id="outlined-basic"
                                  name="email"
                                  onChange={handleChange}
                                  error={touched.email && Boolean(errors.email)}
                                  helperText={touched.email && errors.email}
                                  disabled={!isEdit}
                                />
                              )}
                            />
                          </Grid>
                        }


                        <Grid item xs={12}>
                          {/* {
                            (isEdit && !isLoading) &&
                            <Button type="submit" variant="contained" color="primary">
                              {memberId ? 'Update' : 'Submit'}
                            </Button>
                          } */}
                          {
                            isEdit &&
                            <LoadingButton loading={checkLoader} type="submit" variant="contained" color="primary">
                              {memberId ? 'Update' : 'Submit'}
                            </LoadingButton>
                          }

                          <Button onClick={() => { onClose(0) }} variant="contained" sx={{ marginLeft: '10px' }}>
                            Close
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  </Box>
                )}
              </Formik>
            }
          </>
        )}
    </Modal>
  );
};

export default MemberProfileModal;
