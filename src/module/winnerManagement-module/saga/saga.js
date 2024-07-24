/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_QUIZ_DATA_FAILED,
  GET_QUIZ_DATA_REQUEST,
  GET_QUIZ_DATA_SUCCESS,
  GET_WINNER_DATA_BY_ID_FAILED,
  GET_WINNER_DATA_BY_ID_REQUEST,
  GET_WINNER_DATA_BY_ID_SUCCESS,
  GET_WINNET_QUIZ_REQUEST,
  GET_WINNET_QUIZ_TEMPLATE_REQUEST,
  GET_WINNET_QUIZ_BY_ID_REQUEST,
  GET_WINNET_QUIZ_PLAYER_DATA_REQUEST
} from '../action/action';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';

const getQuizData = (quizData) => {
  return fetchClient.get(apiUrl.winnerQuizListData, quizData).then((auth) => {
    return auth;
  });
};

function* quizData(quizDetails) {
  try {
    const response = yield call(getQuizData, quizDetails.payload);
    yield put({
      type: GET_QUIZ_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_DATA_FAILED,
      payload: err,
    });
  }
}

const getWinnerDataById = (quizTemplateId) => {
  return fetchClient.get(`quiz/${quizTemplateId}`, quizData).then((auth) => {
    return auth;
  });
};

function* winnerData(quizTemplateId) {
  try {
    const response = yield call(getWinnerDataById, quizTemplateId.payload);

    yield put({
      type: GET_WINNER_DATA_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_WINNER_DATA_BY_ID_FAILED,
      payload: err,
    });
  }
}


const getWinnerQuizRequestDataOld = (data) => {
  const { pageNo, name, order } = data.payload.reqData;
  return fetchClient.get(`/quiz-list?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
};

const getWinnerQuizRequestData = (data) => {
  const { pageNo, name, order } = data.payload.reqData;
  return fetchClient.get(`/quiz-winner-list?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
};

function* getWinnerQuizRequestDataWatcher(action) {
  try {
    const response = yield call(getWinnerQuizRequestData, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getWinnerQuizTemplateRequestData = () => {
  return fetchClient.get(`/quiz-template`, {}).then((auth) => {
    return auth;
  });
};

function* getWinnerQuizTemplateRequestDataWatcher(action) {
  try {
    const response = yield call(getWinnerQuizTemplateRequestData, '');
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}


const getWinnerQuizTemplateByIDRequestDataold = (data) => {
  const { id, pageNo, name, order } = data.payload.reqData;
  return fetchClient.get(`/quiz-list/${id}?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
};

const getWinnerQuizTemplateByIDRequestData = (data) => {
  const { id, pageNo, name, order } = data.payload.reqData;
  return fetchClient.get(`/quiz-winner-list/${id}?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
};

function* getWinnerQuizTemplateByIDRequestDataWatcher(action) {
  try {
    const response = yield call(getWinnerQuizTemplateByIDRequestData, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getWinnerQuizPlayerDataRequestData = (data) => {
  const { id, pageNo } = data.payload.reqData;
  return fetchClient.get(`/quiz/${id}?page=${pageNo}&pageSize=10`, {}).then((auth) => {
    return auth;
  });
};

function* getWinnerQuizPlayerDataWatcher(action) {
  try {
    const response = yield call(getWinnerQuizPlayerDataRequestData, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

export default function* winnerManagementModuleSaga() {
  yield takeLatest(GET_QUIZ_DATA_REQUEST, quizData);
  yield takeLatest(GET_WINNER_DATA_BY_ID_REQUEST, winnerData);
  yield takeLatest(GET_WINNET_QUIZ_REQUEST, getWinnerQuizRequestDataWatcher);
  yield takeLatest(GET_WINNET_QUIZ_TEMPLATE_REQUEST, getWinnerQuizTemplateRequestDataWatcher);
  yield takeLatest(GET_WINNET_QUIZ_BY_ID_REQUEST, getWinnerQuizTemplateByIDRequestDataWatcher);
  yield takeLatest(GET_WINNET_QUIZ_PLAYER_DATA_REQUEST, getWinnerQuizPlayerDataWatcher);
}
