/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_QUIZ_QUESTION_FAILED,
  CREATE_QUIZ_QUESTION_REQUEST,
  CREATE_QUIZ_QUESTION_SUCCESS,
  DELETE_QUIZ_QUESTION_BY_ID_FAILED,
  DELETE_QUIZ_QUESTION_BY_ID_REQUEST,
  DELETE_QUIZ_QUESTION_BY_ID_SUCCESS,
  GET_QUIZ_QUESTION_BY_ID_FAILED,
  GET_QUIZ_QUESTION_BY_ID_REQUEST,
  GET_QUIZ_QUESTION_BY_ID_SUCCESS,
  GET_QUIZ_QUESTION_FAILED,
  GET_QUIZ_QUESTION_REQUEST,
  GET_QUIZ_QUESTION_SUCCESS,
  UPDATE_QUIZ_QUESTION_BY_ID_FAILED,
  UPDATE_QUIZ_QUESTION_BY_ID_REQUEST,
  UPDATE_QUIZ_QUESTION_BY_ID_SUCCESS,
  UPLOAD_EXCEL_FILE_FAILED,
  UPLOAD_EXCEL_FILE_REQUEST,
  UPLOAD_EXCEL_FILE_SUCCESS,
  GET_QUESTION_SET_BY_CATEGORY_ID,
  GET_QUESTION_SET_ALL_REQ,
  GET_QUESTION_PAGINATION_REQ,
  BULK_IMPORT_QUESSTION_DATA_REQ,
  FETCH_QUESTION_BY_CATEGORY_ID_REQ,
  DELETE_QUESTION_BY_ID,
  UPDATE_QUESTION_BY_ID,
  ADD_NEW_QUESTION,
  FETCH_ALL_QUIZ_CATEGORY,
  SEARCH_QUESSTION_BY_TEXT,
  DOWNLOAD_FILE_BY_CATEGORY_SELECTION,
  UPLOAD_MULTIPLE_IMAGE_FOR_CATEGORY
} from '../action/action';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';

const postQuizQuestionData = (quizQuestionData) => {
  return fetchClient.post(apiUrl.quizQuestionManagement, quizQuestionData).then((auth) => {
    return auth;
  });
};

function* createQuizQuestion(quizQuestionData) {
  try {
    const response = yield call(postQuizQuestionData, quizQuestionData.payload);
    yield put({
      type: CREATE_QUIZ_QUESTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_QUIZ_QUESTION_FAILED,
      payload: err,
    });
  }
}

const getQuizQuestionData = (quizQuestionData) => {
  return fetchClient.get(apiUrl.quizQuestionManagement, quizQuestionData).then((auth) => {
    return auth;
  });
};

function* getQuizQuestion(quizQuestionData) {
  try {
    const response = yield call(getQuizQuestionData, quizQuestionData.payload);

    yield put({
      type: GET_QUIZ_QUESTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_QUESTION_FAILED,
      payload: err,
    });
  }
}

const getQuizQuestionDataById = (questionId) => {
  return fetchClient.get(`question/${questionId}`, questionId).then((auth) => {
    return auth;
  });
};

function* getQuizQuestionById(questionId) {
  try {
    const response = yield call(getQuizQuestionDataById, questionId.payload);
    yield put({
      type: GET_QUIZ_QUESTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_QUESTION_BY_ID_FAILED,
      payload: err,
    });
  }
}

const updateQuizQuestionDataById = (updatedData) => {
  const { questionId, ...payloadData } = updatedData;

  return fetchClient.put(`question/${questionId}`, payloadData).then((auth) => {
    return auth;
  });
};

function* updateQuizQuestionById(updatedData) {
  try {
    const response = yield call(updateQuizQuestionDataById, updatedData.payload);
    yield put({
      type: UPDATE_QUIZ_QUESTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_QUIZ_QUESTION_BY_ID_FAILED,
      payload: err,
    });
  }
}

const deleteQuizCategoryData = (questionId) => {
  return fetchClient.delete(`question/${questionId}`, questionId).then((auth) => {
    return auth;
  });
};
function* deleteQuizQuestionById(questionId) {
  try {
    const response = yield call(deleteQuizCategoryData, questionId.payload);
    yield put({
      type: DELETE_QUIZ_QUESTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_QUIZ_QUESTION_BY_ID_FAILED,
      payload: err,
    });
  }
}

const uploadQuestionDataFile = (formData) => {
  return fetchClient.post(apiUrl.quizQuestionBulkImport, formData).then((auth) => {
    return auth;
  });
};
function* uploadQuestionDoc(formData) {
  try {
    const response = yield call(uploadQuestionDataFile, formData.payload);
    yield put({
      type: UPLOAD_EXCEL_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_EXCEL_FILE_FAILED,
      payload: err,
    });
  }
}

const getQuestionSetByIdReq = (data) => {
  const { caategoryid } = data.payload.reqData;
  return fetchClient.get(`/question/${caategoryid}`, {}).then((auth) => {
    return auth;
  });
};

function* getQuestionSetByIdWatcher(action) {
  try {
    const response = yield call(getQuestionSetByIdReq, action);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getQuestionSetAllReq = (data) => {
  const { caategoryid } = data.payload.reqData;
  return fetchClient.get(`/question`, {}).then((auth) => {
    return auth;
  });
};

function* getQuestionSetAllWatcher(action) {
  try {
    const response = yield call(getQuestionSetAllReq, action);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getQuestionDataByPaginationReq = (data) => {
  const { pageNo } = data.payload.reqData;
  return fetchClient.get(`/question?page=${pageNo}&pageSize=30`, {}).then((auth) => {
    return auth;
  });
};

function* getQuestionDataByPaginationWatcher(action) {
  try {
    const response = yield call(getQuestionDataByPaginationReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const uploadQuestionDataByCatIdnRequesst = (data) => {
  //
  // return fetchClient.post(`/question/bulk-import`, data).then((auth) => {
  //   return auth;
  // });
  return fetchClient.post(`/question-import/bulk-import`, data).then((auth) => {
    return auth;
  });

};

function* uploadQuestionDataByCatIdnWatcher(action) {
  try {
    const response = yield call(uploadQuestionDataByCatIdnRequesst, action.payload.reqData);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const fetchQuesstionByCategoryIdRequest = (data) => {
  //
  return fetchClient.get(`/question-by-category/${data.categoryid}?page=${data.pageNo}&pageSize=30`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchQuesstionByCategoryIdWatcher(action) {
  try {
    const response = yield call(fetchQuesstionByCategoryIdRequest, action.payload.reqData);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const removeQuestionByIdRequest = (data) => {
  //
  return fetchClient.delete(`/question/${data.questionId}`, {}).then((auth) => {
    return auth;
  });
  //
};

function* removeQuestionByIdWatcher(action) {
  try {
    const response = yield call(removeQuestionByIdRequest, action.payload.reqData);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const updateQuestionByIdRequest = (data) => {
  //
  return fetchClient.put(`/question/${data.questionId}/${data.categoryId}`, data.data).then((auth) => {
    return auth;
  });
  //
};

function* updatequestionByIdWatcher(action) {
  try {
    const response = yield call(updateQuestionByIdRequest, action.payload.reqData);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const addNewquestionByrequest = (data) => {

  //
  console.log(JSON.stringify(data));
  return fetchClient.post(`/question/${data.categoryId}`, data.data).then((auth) => {
    return auth;
  });
  //
};

function* addNewquestionByWatcher(action) {
  try {
    const response = yield call(addNewquestionByrequest, action.payload.reqData);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const fetchQuizCategoryRequest = (data) => {
  //
  return fetchClient.get(`/quiz-category`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchQuizCategoryWatcher(action) {
  try {
    const response = yield call(fetchQuizCategoryRequest, {});
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const fetchQuestionBySearchTextRequest = (data) => {
  //
  return fetchClient.get(`/search-question?searchQuery=${data.queryText}`, {}).then((auth) => {
    return auth;
  });
  //
};

function* fetchQuestionBySearchTextWatcher(action) {
  try {
    const response = yield call(fetchQuestionBySearchTextRequest, action.payload.reqData);
    action.payload.onSuccess(response.data);
  } catch (err) {
    action.payload.onError(err);
  }
}

const getExportFileByCatIdRequest = (data) => {
  //
  return fetchClient.get(`/export-question/${data.catId}`, {}).then((auth) => {
    return auth;
  });
  // const formData = new FormData();
  // formData.append('category', data.catId);
  // return fetchClient.post(`/question/bulk-import`, formData).then((auth) => {
  //   return auth;
  // });
  //
};

function* getExportFileByCatIdWatcher(action) {
  try {
    const response = yield call(getExportFileByCatIdRequest, action.payload.reqData);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

const uploadMultipleImageForCategoryRequest = (data) => {
  //
  // console.log('====================================');
  // console.log(JSON.stringify(data));
  // console.log('====================================');
  // data.catId
  // data.data
  //
  return fetchClient.post(`/question/image-upload/${data.catId}`, data.data).then((auth) => {
    return auth;
  });
  //
};

function* uploadMultipleImageForCategoryWatcher(action) {
  try {
    const response = yield call(uploadMultipleImageForCategoryRequest, action.payload.reqData);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}

export default function* quizQuestionManagementModuleSaga() {
  yield takeLatest(CREATE_QUIZ_QUESTION_REQUEST, createQuizQuestion);
  yield takeLatest(GET_QUIZ_QUESTION_REQUEST, getQuizQuestion);
  yield takeLatest(GET_QUIZ_QUESTION_BY_ID_REQUEST, getQuizQuestionById);
  yield takeLatest(UPDATE_QUIZ_QUESTION_BY_ID_REQUEST, updateQuizQuestionById);
  yield takeLatest(DELETE_QUIZ_QUESTION_BY_ID_REQUEST, deleteQuizQuestionById);
  yield takeLatest(UPLOAD_EXCEL_FILE_REQUEST, uploadQuestionDoc);
  yield takeLatest(GET_QUESTION_SET_BY_CATEGORY_ID, getQuestionSetByIdWatcher);
  yield takeLatest(GET_QUESTION_SET_ALL_REQ, getQuestionSetAllWatcher);
  yield takeLatest(GET_QUESTION_PAGINATION_REQ, getQuestionDataByPaginationWatcher);
  yield takeLatest(BULK_IMPORT_QUESSTION_DATA_REQ, uploadQuestionDataByCatIdnWatcher);
  yield takeLatest(FETCH_QUESTION_BY_CATEGORY_ID_REQ, fetchQuesstionByCategoryIdWatcher);
  yield takeLatest(DELETE_QUESTION_BY_ID, removeQuestionByIdWatcher);
  yield takeLatest(UPDATE_QUESTION_BY_ID, updatequestionByIdWatcher);
  yield takeLatest(ADD_NEW_QUESTION, addNewquestionByWatcher);
  yield takeLatest(FETCH_ALL_QUIZ_CATEGORY, fetchQuizCategoryWatcher);
  yield takeLatest(SEARCH_QUESSTION_BY_TEXT, fetchQuestionBySearchTextWatcher);
  yield takeLatest(DOWNLOAD_FILE_BY_CATEGORY_SELECTION, getExportFileByCatIdWatcher);
  yield takeLatest(UPLOAD_MULTIPLE_IMAGE_FOR_CATEGORY, uploadMultipleImageForCategoryWatcher);
}
