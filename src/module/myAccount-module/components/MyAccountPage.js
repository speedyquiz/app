/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
// @mui
import { Card, Stack, Container, Typography, Grid, TextField, CircularProgress, Button } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountToolbar } from '../../../sections/@dashboard/account';
import { GET_ACCOUNT_PROFILE_REQUEST, UPDATE_ACCOUNT_PASSWORD_REQUEST, UPDATE_ACCOUNT_PROFILE_BY_ID_REQUEST, updateAccountPasswordRequest } from '../action/action';

export default function MyAccountPage() {
  const userId = localStorage.getItem('userId');
  const { myAccountData, isLoading } = useSelector((state) => state.myAccountModule);

  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [userEmail, setUserEmai] = useState('');
  useEffect(() => {
    if (userId) {
      dispatch({
        type: GET_ACCOUNT_PROFILE_REQUEST,
        payload: userId,
      });
    }
  }, [userId]);
  //
  useEffect(() => {
    if (myAccountData) {
      setInitialData(myAccountData);
      setAccountData(myAccountData);
      setUserEmai(myAccountData.email)
    }
  }, [myAccountData]);
  //
  const handleUpdate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if data has changed
    if (!isDataChanged) {
      return;
    }

    // Validate data (you can add more validation logic)
    if (!accountData.name) {
      return;
    }

    if (!emailRegex.test(accountData.email)) {
      return;
    }

    const updatedDataWithUserId = {
      userId,
      email: accountData.email,
      name: accountData.name,
    };
    dispatch({
      type: UPDATE_ACCOUNT_PROFILE_BY_ID_REQUEST,
      payload: updatedDataWithUserId,
    });
    //
    if (isPasswordSet) {
      // const updatedDataWitPassword = {
      //   userId: accountData._id,
      //   token: localStorage.getItem('token'),
      //   oldPassword: `${oldPassword}`,
      //   newPassword: password
      // };
      // //
      // dispatch({
      //   type: UPDATE_ACCOUNT_PASSWORD_REQUEST,
      //   payload: updatedDataWitPassword,
      // });
      //
      dispatch(
        updateAccountPasswordRequest({
          reqData: {
            'userId': accountData._id,
            'oldPassword': oldPassword,
            'newPassword': password
          },
          onSuccessData: (responseData) => {
            // console.log('====================================');
            // console.log(JSON.stringify(responseData));
            // console.log('====================================');
            alert(responseData?.message)
          },
          onErrorData: (error) => {
            // console.log('====================================');
            // console.log(JSON.stringify(error?.response?.data?.message));
            // console.log('====================================');
            alert(error?.response?.data?.message)
          }
        })
      )
    }
    //
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
    setIsDataChanged(true);
  };
  //
  return (
    <>
      <Helmet>
        <title> My Account | SpeedQuiz </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Account
          </Typography>
        </Stack>
        <Card sx={{ height: '800px' }}>
          <AccountToolbar />
          {isLoading ? (
            <CircularProgress
              style={{
                marginLeft: '50%',
              }}
            />
          ) : (
            <Grid container spacing={2} sx={{ marginLeft: '10px' }}>
              <Grid item xs={11}>
                <TextField
                  label="Email ID"
                  name="email"
                  value={accountData.email}
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Name"
                  name="name"
                  value={accountData.name}
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Username"
                  name="username"
                  value={accountData.username}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Old Password"
                  name="Old Password"
                  value={oldPassword}
                  variant="outlined"
                  type='password'
                  fullWidth
                  onChange={(e) => {
                    setOldPassword(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Password"
                  name="Password"
                  value={password}
                  variant="outlined"
                  type='password'
                  fullWidth
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (e.target.value === repassword) {
                      setIsDataChanged(true)
                      setIsPasswordSet(true)
                    } else {
                      setIsDataChanged(false)
                      setIsPasswordSet(false)
                    }

                  }}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Confirm Password"
                  name="Confirm Password"
                  value={repassword}
                  variant="outlined"
                  type='password'
                  fullWidth
                  onChange={(e) => {
                    setRePassword(e.target.value)
                    if (password === e.target.value) {
                      setIsDataChanged(true)
                      setIsPasswordSet(true)
                    } else {
                      setIsDataChanged(false)
                      setIsPasswordSet(false)
                    }
                  }}
                />
              </Grid>
              {/* <Grid item xs={11}>
                <TextField
                  label="Points"
                  name="points"
                  value={accountData.points}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid> */}
              {/* <Grid item xs={11}>
              <TextField label="Country" value={accountData?.email}  variant="outlined" fullWidth />
            </Grid> */}
              <Grid item xs={11}>
                <Button type="button" variant="contained" onClick={handleUpdate} disabled={!isDataChanged}>
                  Update
                </Button>
              </Grid>
            </Grid>
          )}
        </Card>
      </Container>
    </>
  );
}
