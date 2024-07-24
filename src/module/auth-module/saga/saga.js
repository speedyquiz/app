/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import { POST_ADMIN_SIGNIN_FAILED, POST_ADMIN_SIGNIN_REQUEST, POST_ADMIN_SIGNIN_SUCCESS } from '../action/action';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import { routesName } from 'src/constant/routes/routesPath';

const postSignIn = (signinData) => {
  return fetchClient.post(apiUrl.signIn, signinData).then((auth) => {
    return auth;
  });
};

function* signinAdmin(signInDetails) {
  try {
    const { navigate } = signInDetails.payload;
    const response = yield call(postSignIn, signInDetails.payload);
    const signinData = response.data;
    
    // localStorage.setItem('userName', signinData.username);
    localStorage.setItem('userName',signinData.username)
    localStorage.setItem('token',signinData.accessToken)
    localStorage.setItem('userId',signinData._id)
    // localStorage.setItem('uniqueId', response.data);
    // 
    yield put({
      type: POST_ADMIN_SIGNIN_SUCCESS,
      payload: response.data,
    });
    navigate(routesName.dashboardApp);
    // window.location.href = routesName.dashboardApp;
    //   setTimeout(() => {
    //   }, 6000);
  } catch (err) {
    yield put({
      type: POST_ADMIN_SIGNIN_FAILED,
      payload: err,
    });
  }
}

export default function* authModuleSaga() {
  yield takeLatest(POST_ADMIN_SIGNIN_REQUEST, signinAdmin);
}
