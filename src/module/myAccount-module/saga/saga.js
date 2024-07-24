/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import { GET_ACCOUNT_PROFILE_FAILED, GET_ACCOUNT_PROFILE_REQUEST, GET_ACCOUNT_PROFILE_SUCCESS, UPDATE_ACCOUNT_PROFILE_BY_ID_FAILED, UPDATE_ACCOUNT_PROFILE_BY_ID_REQUEST, UPDATE_ACCOUNT_PROFILE_BY_ID_SUCCESS, UPDATE_ACCOUNT_PASSWORD_REQUEST, UPDATE_ACCOUNT_PASSWORD_SUCCESS, UPDATE_ACCOUNT_PASSWORD_FAILED } from '../action/action';
import apiUrl from 'src/constant/common/apiConstant';

const getMyAccountProfile = (userId) => {
  return fetchClient.get(`user/get-profile/${userId}`, userId).then((auth) => {
    return auth;
  });
};

function* myAccountProfile(userId) {
  try {
    const response = yield call(getMyAccountProfile, userId.payload);
    yield put({
      type: GET_ACCOUNT_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_ACCOUNT_PROFILE_FAILED,
      payload: err,
    });
  }
}
const postMyUpdatedAccountProfile = (updatedData) => {
  const { userId, ...restUpdatedData } = updatedData;
  return fetchClient.put(`/user/update-profile/${userId}`, restUpdatedData).then((auth) => {
    return auth;
  });
};

function* updatedAccountProfile(updatedData) {
  try {
    const response = yield call(postMyUpdatedAccountProfile, updatedData.payload);
    yield put({
      type: UPDATE_ACCOUNT_PROFILE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_ACCOUNT_PROFILE_BY_ID_FAILED,
      payload: err,
    });
  }
}


// const resetPasswordUpdate = (updatedData) => {
//   //
//   console.log(JSON.stringify(updatedData));
//   const { oldPassword = "", newPassword = "" } = updatedData;
//   //
//   return fetchClient.put(`/change-password/${updatedData.userId}`, {"oldPassword":"admin","newPassword":"admin123"}).then((auth) => {
//     return auth;
//   });
// };

// function* updatedAccountPassword(updatedData) {
//   try {
//     const response = yield call(resetPasswordUpdate, updatedData.payload);
//     //
//     console.log(JSON.stringify(response));
//     //
//     yield put({
//       type: UPDATE_ACCOUNT_PASSWORD_SUCCESS,
//       payload: response.data,
//     });
//   } catch (err) {
//     yield put({
//       type: UPDATE_ACCOUNT_PASSWORD_FAILED,
//       payload: err,
//     });
//   }
// }

const resetPasswordUpdate = (data) => {
  //
  const { userId = "", oldPassword = "", newPassword = "" } = data.payload.reqData;
  //
  return fetchClient.put(`/change-password/${userId}`, { "oldPassword": oldPassword, "newPassword": newPassword })
    .then((auth) => {
      return auth;
    })
};

function* updatedAccountPassword(action) {
  try {
    const response = yield call(resetPasswordUpdate, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

export default function* myAccountModuleSaga() {
  yield takeLatest(GET_ACCOUNT_PROFILE_REQUEST, myAccountProfile);
  yield takeLatest(UPDATE_ACCOUNT_PROFILE_BY_ID_REQUEST, updatedAccountProfile);
  yield takeLatest(UPDATE_ACCOUNT_PASSWORD_REQUEST, updatedAccountPassword);
}
