/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
  CREATE_QUIZ_TEMPLATE_FAILED, CREATE_QUIZ_TEMPLATE_REQUEST,
  CREATE_QUIZ_TEMPLATE_SUCCESS, DELETE_QUIZ_TEMPLATE_BY_ID_FAILED,
  DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST, DELETE_QUIZ_TEMPLATE_BY_ID_SUCCESS,
  GET_QUIZ_TEMPLATE_BY_ID_FAILED, GET_QUIZ_TEMPLATE_BY_ID_REQUEST,
  GET_QUIZ_TEMPLATE_BY_ID_SUCCESS, GET_QUIZ_TEMPLATE_FAILED,
  GET_QUIZ_TEMPLATE_REQUEST, GET_QUIZ_TEMPLATE_SUCCESS,
  UPDATE_QUIZ_TEMPLATE_BY_ID_FAILED, UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST,
  UPDATE_QUIZ_TEMPLATE_BY_ID_SUCCESS, QUIZ_TEMPLATE_CREATE_DATA_REQ, QUIZ_TEMPLATE_UPDATE_DATA_REQ,
  UPDATE_MODAL_DATA_REQ, UPDATE_TEMPLATE_STATUS_REQ
} from '../action/action';

const getQuizTemplateData = (quizTemplateData) => {
  return fetchClient.get(apiUrl.quizTemplateManagement, quizTemplateData).then((auth) => {
    return auth;
  });
};

function* getQuizTemplate(quizTemplateData) {
  try {
    const response = yield call(getQuizTemplateData, quizTemplateData.payload);

    yield put({
      type: GET_QUIZ_TEMPLATE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_TEMPLATE_FAILED,
      payload: err,
    });
  }
}


const postQuizTemplateData = (quizTemplateData) => {
  return fetchClient.post(apiUrl.quizTemplateManagement, quizTemplateData).then((auth) => {
    return auth;
  });
};

function* createQuizTemplate(quizTemplateData) {
  try {
    const response = yield call(postQuizTemplateData, quizTemplateData.payload);
    yield put({
      type: CREATE_QUIZ_TEMPLATE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_QUIZ_TEMPLATE_FAILED,
      payload: err,
    });
  }
}

const deleteQuizTemplateData = (templateId) => {
  return fetchClient.delete(`quiz-template/${templateId}`, templateId).then((auth) => {
    return auth;
  });
};
function* deleteQuizTemplateById(templateId) {
  try {
    const response = yield call(deleteQuizTemplateData, templateId.payload);
    yield put({
      type: DELETE_QUIZ_TEMPLATE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_QUIZ_TEMPLATE_BY_ID_FAILED,
      payload: err,
    });
  }
}


const getQuizTemplateDataById = (templateId) => {
  return fetchClient.get(`quiz-template/${templateId}`, templateId).then((auth) => {
    return auth;
  });
};

function* getQuizTemplateById(templateId) {
  try {
    const response = yield call(getQuizTemplateDataById, templateId.payload);
    yield put({
      type: GET_QUIZ_TEMPLATE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_TEMPLATE_BY_ID_FAILED,
      payload: err,
    });
  }
}

const updateQuizTemplateDataById = (updatedData) => {

  return fetchClient.put(`quiz-template/${updatedData.id}`, updatedData.formData).then((auth) => {
    return auth;
  });
};

function* updateQuizTemplateById(updatedData) {
  try {
    const response = yield call(updateQuizTemplateDataById, updatedData.payload);
    yield put({
      type: UPDATE_QUIZ_TEMPLATE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_QUIZ_TEMPLATE_BY_ID_FAILED,
      payload: err,
    });
  }
}

// const getQuizTemplateDataReq = (data) => {
//   //
//   return fetchClient.get(`/quiz-template`, {}).then((auth) => {
//     return auth;
//   });
// };

// function* getQuizTemplateDataWatcher(action) {
//   try {
//     const response = yield call(getQuizTemplateDataReq, action);
//     action.payload.onSuccess(response.data);
//   } catch (err) {
//     action.payload.onError(err);
//   }
// }

//
const createQuizTemplateDataReq = (data) => {
  //
  return fetchClient.post(`/quiz-template`, data.payload.reqData).then((auth) => {
    return auth;
  });
};

function* createQuizTemplateDataWacher(action) {
  try {
    const response = yield call(createQuizTemplateDataReq, action);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}
//
const updateQuizTemplateDataReq = (data) => {
  const { templateId, formData } = data.payload.reqData;
  return fetchClient.put(`/quiz-template/${templateId}`, formData).then((auth) => {
    return auth;
  });
};

function* updateQuizTemplateDataWacher(action) {
  try {
    const response = yield call(updateQuizTemplateDataReq, action);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}


const updateModalDataRequest = (data) => {
  return ""
};

function* updateModalDatawatcher(action) {
  try {
    const response = yield call(updateModalDataRequest, action);
    yield put({
      type: 'modalCheck',
      payload: "",
    });
    action.payload.onSuccess('');
  } catch (err) {
    action.payload.onError(err);
  }
}

const updateTemplateStatusRequest = (data) => {
  const { templateId, formData } = data.payload.reqData;
  return fetchClient.put(`/active-deactive-template/${templateId}`, formData).then((auth) => {
    return auth;
  });
};

function* updateTemplateStatusWatcher(action) {
  try {
    const response = yield call(updateTemplateStatusRequest, action);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

export default function* quizTemplateManagementModuleSaga() {
  yield takeLatest(GET_QUIZ_TEMPLATE_REQUEST, getQuizTemplate);
  yield takeLatest(CREATE_QUIZ_TEMPLATE_REQUEST, createQuizTemplate);
  yield takeLatest(DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST, deleteQuizTemplateById);
  yield takeLatest(GET_QUIZ_TEMPLATE_BY_ID_REQUEST, getQuizTemplateById);
  yield takeLatest(UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST, updateQuizTemplateById);
  yield takeLatest(QUIZ_TEMPLATE_CREATE_DATA_REQ, createQuizTemplateDataWacher);
  yield takeLatest(QUIZ_TEMPLATE_UPDATE_DATA_REQ, updateQuizTemplateDataWacher);
  yield takeLatest(UPDATE_MODAL_DATA_REQ, updateModalDatawatcher);
  yield takeLatest(UPDATE_TEMPLATE_STATUS_REQ, updateTemplateStatusWatcher);
  // yield takeLatest(GET_QUIZ_TEMPLATE_DATA_REQUEST, getQuizTemplateDataWatcher);
  // QUIZ_TEMPLATE_CREATE_DATA_REQ, QUIZ_TEMPLATE_UPDATE_DATA_REQ
}
