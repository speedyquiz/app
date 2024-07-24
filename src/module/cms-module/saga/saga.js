/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import { POST_CMS_FAILED, POST_CMS_REQUEST, POST_CMS_SUCCESS, GET_HOME_PAGE_DATA_REQ, GET_CMS_ABOUT_US_REQ, GET_CMS_ABOUT_US_UPDATE_REQ, GET_FAQ_DATA_REQ,GET_FAQ_POST_DATA_REQ } from '../action/action';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';

const postCmsData = (cmsData) => {
  return fetchClient.post(apiUrl.contentManagementSystem, cmsData).then((auth) => {
    return auth;
  });
};

function* cms(cmsDetails) {
  try {
    const response = yield call(postCmsData, cmsDetails.payload);
    yield put({
      type: POST_CMS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: POST_CMS_FAILED,
      payload: err,
    });
  }
}

const getHomePageDataReq = (data) => {
  return fetchClient.get(`/dashboard-statistical-count`, {}).then((auth) => {
    return auth;
  });
};

function* getHomePageDataWatcher(action) {
  try {
    const response = yield call(getHomePageDataReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getAboutUsDataReq = (data) => {
  return fetchClient.get(`/cms/about-us`, {}).then((auth) => {
    return auth;
  });
};

function* getAboutUsDataWatcher(action) {
  try {
    const response = yield call(getAboutUsDataReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const updateAboutUsDataReq = (data) => {
  return fetchClient.put(`/cms/about-us`, data.payload.reqData).then((auth) => {
    return auth;
  });
};

function* updateAboutUsDataWatcher(action) {
  try {
    const response = yield call(updateAboutUsDataReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getFaqDataRequest = (data) => {
  return fetchClient.get(`/faq`, {}).then((auth) => {
    return auth;
  });
};

function* getFaqDatawatcher(action) {
  try {
    const response = yield call(getFaqDataRequest, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}


const updateFaqDataRequest = (data) => {
  const {userId,content} = data.payload.reqData
  return fetchClient.post(`/faq`, {"question":'test','answer':content}).then((auth) => {
    return auth;
  });
};

function* updateFaqDataWatcher(action) {
  try {
    const response = yield call(updateFaqDataRequest, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}




export default function* cmsModuleSaga() {
  yield takeLatest(POST_CMS_REQUEST, cms);
  yield takeLatest(GET_HOME_PAGE_DATA_REQ, getHomePageDataWatcher);
  yield takeLatest(GET_CMS_ABOUT_US_REQ, getAboutUsDataWatcher);
  yield takeLatest(GET_CMS_ABOUT_US_UPDATE_REQ, updateAboutUsDataWatcher);
  yield takeLatest(GET_FAQ_DATA_REQ, getFaqDatawatcher);
  yield takeLatest(GET_FAQ_POST_DATA_REQ, updateFaqDataWatcher);

  
}
