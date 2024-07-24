/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
  CREATE_QUIZ_CATEGORY_FAILED,
  CREATE_QUIZ_CATEGORY_REQUEST,
  CREATE_QUIZ_CATEGORY_SUCCESS,
  DELETE_QUIZ_CATEGORY_BY_ID_FAILED,
  DELETE_QUIZ_CATEGORY_BY_ID_REQUEST,
  DELETE_QUIZ_CATEGORY_BY_ID_SUCCESS,
  GET_QUIZ_CATEGORY_BY_ID_FAILED,
  GET_QUIZ_CATEGORY_BY_ID_REQUEST,
  GET_QUIZ_CATEGORY_BY_ID_SUCCESS,
  GET_QUIZ_CATEGORY_FAILED,
  GET_QUIZ_CATEGORY_REQUEST,
  GET_QUIZ_CATEGORY_SUCCESS,
  UPDATE_QUIZ_CATEGORY_BY_ID_FAILED,
  UPDATE_QUIZ_CATEGORY_BY_ID_REQUEST,
  UPDATE_QUIZ_CATEGORY_BY_ID_SUCCESS,
} from '../action/action';

const postQuizCategory = (categoryData) => {
  return fetchClient.post(apiUrl.quizCategory, categoryData).then((auth) => {
    return auth;
  });
};

function* createQuizCategory(categoryData) {
  try {
    const response = yield call(postQuizCategory, categoryData.payload);
    yield put({
      type: CREATE_QUIZ_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_QUIZ_CATEGORY_FAILED,
      payload: err,
    });
  }
}

const getQuizCategoryData = (categoryData) => {
  return fetchClient.get(apiUrl.quizCategory, categoryData).then((auth) => {
    return auth;
  });
};
function* quizCategoryData(categoryData) {
  try {
    const response = yield call(getQuizCategoryData, categoryData.payload);
    yield put({
      type: GET_QUIZ_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_CATEGORY_FAILED,
      payload: err,
    });
  }
}
const getQuizCategoryDataById = (categoryId) => {
  return fetchClient.get(`quiz-category/${categoryId}`, categoryId).then((auth) => {
    return auth;
  });
};
function* quizCategoryDataById(categoryId) {
  try {
    const response = yield call(getQuizCategoryDataById, categoryId.payload);
    yield put({
      type: GET_QUIZ_CATEGORY_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_QUIZ_CATEGORY_BY_ID_FAILED,
      payload: err,
    });
  }
}
const updateQuizCategoryDataByIdApi = (updatedData) => {
  const { categoryId, ...payloadData } = updatedData;
  return fetchClient.put(`quiz-category/${categoryId}`, payloadData).then((auth) => {
    return auth;
  });
};
function* updateQuizCategoryDataById(updatedData) {
  try {
    const response = yield call(updateQuizCategoryDataByIdApi, updatedData.payload);
    yield put({
      type: UPDATE_QUIZ_CATEGORY_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_QUIZ_CATEGORY_BY_ID_FAILED,
      payload: err,
    });
  }
}

const deleteQuizCategoryData = (categoryId) => {
  return fetchClient.delete(`quiz-category/${categoryId}`, categoryId).then((auth) => {
    return auth;
  });
};
function* deleteQuizCategoryById(categoryId) {
  try {
    const response = yield call(deleteQuizCategoryData, categoryId.payload);

    yield put({
      type: DELETE_QUIZ_CATEGORY_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_QUIZ_CATEGORY_BY_ID_FAILED,
      payload: err,
    });
  }
}

export default function* quizCategoryModuleSaga() {
  yield takeLatest(CREATE_QUIZ_CATEGORY_REQUEST, createQuizCategory);
  yield takeLatest(GET_QUIZ_CATEGORY_REQUEST, quizCategoryData);
  yield takeLatest(GET_QUIZ_CATEGORY_BY_ID_REQUEST, quizCategoryDataById);
  yield takeLatest(UPDATE_QUIZ_CATEGORY_BY_ID_REQUEST, updateQuizCategoryDataById);
  yield takeLatest(DELETE_QUIZ_CATEGORY_BY_ID_REQUEST, deleteQuizCategoryById);
}
