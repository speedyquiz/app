/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_ALL_TRACK_PAAYOUT_DATA_REQ,
  FETCH_ALL_TEMPLATE_DATA_REQ,
  FETCH_TRACK_PAYOUT_BY_TEMPLATE_REQ,
  FETCH_ALL_LEADER_BOARD_DATA_REQ
} from '../action/action';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';


const fetchTrackPayoutDataRequest = (data) => {
  //
  const { pageNo, name, order } = data.payload.reqData;
  //
  return fetchClient.get(`/track-payout?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchTrackPayoutDataWatcher(action) {
  try {
    const response = yield call(fetchTrackPayoutDataRequest, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const fetchAllTemplateDataRequest = (data) => {
  //
  return fetchClient.get(`/quiz-all-template`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchAllTemplateDataWatcher(action) {
  try {
    const response = yield call(fetchAllTemplateDataRequest, {});
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const fetchTrackPayoutByIdRequest = (data) => {
  const { id, pageNo, name, order } = data.payload.reqData;
  //
  return fetchClient.get(`/track-payout/${id}?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchTrackPayoutByIdWatcher(action) {
  try {
    const response = yield call(fetchTrackPayoutByIdRequest, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const fetchAllLeaderBoardDataRequest = (data) => {
  //
  const { id, pageNo } = data.payload.reqData;
  //
  return fetchClient.get(`/quiz-leaderboard/${id}?page=${pageNo}&pageSize=10`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchAllLeaderBoardDataWatcher(action) {
  try {
    const response = yield call(fetchAllLeaderBoardDataRequest, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

export default function* trackPayoutManagementModuleSaga() {
  yield takeLatest(FETCH_ALL_TRACK_PAAYOUT_DATA_REQ, fetchTrackPayoutDataWatcher);
  yield takeLatest(FETCH_ALL_TEMPLATE_DATA_REQ, fetchAllTemplateDataWatcher);
  yield takeLatest(FETCH_TRACK_PAYOUT_BY_TEMPLATE_REQ, fetchTrackPayoutByIdWatcher);
  yield takeLatest(FETCH_ALL_LEADER_BOARD_DATA_REQ, fetchAllLeaderBoardDataWatcher);
}
