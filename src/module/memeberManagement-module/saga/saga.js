/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
  CREATE_MEMBER_FAILED, CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS, DELETE_MEMBER_BY_ID_FAILED, DELETE_MEMBER_BY_ID_REQUEST,
  DELETE_MEMBER_BY_ID_SUCCESS, GET_MEMBER_BY_ID_FAILED, GET_MEMBER_BY_ID_REQUEST,
  GET_MEMBER_BY_ID_SUCCESS, GET_MEMBER_DATA_FAILED, GET_MEMBER_DATA_REQUEST,
  GET_MEMBER_DATA_SUCCESS, UPDATE_MEMBER_BY_ID_FAILED, UPDATE_MEMBER_BY_ID_REQUEST,
  UPDATE_MEMBER_BY_ID_SUCCESS, GET_MEMBER_LIST_DATA_REQUEST, CREATE_NEW_MEMBER_REQ,
  DELETE_MEMBER_FROM_LIST_BY_ID, UPDATE_MEMBER_FROM_LIST_BY_ID, GET_USER_DATA_BY_USER_ID,
  GET_USER_DATA_BY_SEARCH_TEXT
} from '../action/action';

const getMemberDataApi = (memberData) => {
  return fetchClient.get(apiUrl.memberManagement, memberData).then((auth) => {
    return auth;
  });
};

function* getMemberData(memberData) {
  try {
    const response = yield call(getMemberDataApi, memberData.payload);
    // 
    yield put({
      type: GET_MEMBER_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_MEMBER_DATA_FAILED,
      payload: err,
    });
  }
}

const deleteMemberData = (memberId) => {
  return fetchClient.delete(`member/${memberId}`, memberId).then((auth) => {
    return auth;
  });
};
function* deleteMemberById(memberId) {
  try {
    const response = yield call(deleteMemberData, memberId.payload);

    yield put({
      type: DELETE_MEMBER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_MEMBER_BY_ID_FAILED,
      payload: err,
    });
  }
}

const postMemberData = (memberData) => {
  return fetchClient.post(apiUrl.memberManagement, memberData).then((auth) => {
    return auth;
  });
};

function* createMember(memberData) {
  try {
    const response = yield call(postMemberData, memberData.payload);
    yield put({
      type: CREATE_MEMBER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_MEMBER_FAILED,
      payload: err,
    });
  }
}

const getMemberDataById = (memberId) => {
  return fetchClient.get(`member/${memberId}`, memberId).then((auth) => {
    return auth;
  });
};
function* memberDataById(memberId) {
  try {
    const response = yield call(getMemberDataById, memberId.payload);
    yield put({
      type: GET_MEMBER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_MEMBER_BY_ID_FAILED,
      payload: err,
    });
  }
}

const updateMemberDataByIdApi = (updatedData) => {
  const { memberId, ...payloadData } = updatedData;
  return fetchClient.put(`member/${memberId}`, payloadData).then((auth) => {
    return auth;
  });
};
function* updateMemberDataById(updatedData) {
  try {
    const response = yield call(updateMemberDataByIdApi, updatedData.payload);
    yield put({
      type: UPDATE_MEMBER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_MEMBER_BY_ID_FAILED,
      payload: err,
    });
  }
}
//
const getMemberListDataReq = (data) => {
  const { pageNo, name, order } = data.payload.reqData;
  return fetchClient.get(`/member?page=${pageNo}&pageSize=10&sortBy=${name}&order=${order}`, {}).then((auth) => {
    return auth;
  });
};

function* getMemberListDataWatcher(action) {
  try {
    const response = yield call(getMemberListDataReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}
//
const createMemberListDataReq = (data) => {
  return fetchClient.post(`/member`, data.payload.reqData).
    then((auth) => {
      return auth;
    })
};

function* createMemberListDataWatcher(action) {
  try {
    const response = yield call(createMemberListDataReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}
//
const deleteMemberListDataReq = (data) => {
  return fetchClient.delete(`/member/${data.payload.reqData.id}`, {}).then((auth) => {
    return auth;
  });
};

function* deleteMemberListDataWWatcher(action) {
  try {
    const response = yield call(deleteMemberListDataReq, action);
    action.payload.onSuccess('');
  } catch (err) {
    action.payload.onError(err);
  }
}
//
const updateMemberListDataReq = (data) => {
  const { userId, formData } = data.payload.reqData
  return fetchClient.put(`/member/${userId}`, formData).then((auth) => {
    return auth;
  });
};

function* updateMemberListDataWatcher(action) {
  try {
    const response = yield call(updateMemberListDataReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}
//
const getUserDatabyIdReq = (data) => {
  const { userId } = data.payload.reqData
  return fetchClient.get(`/member/${userId}`, {}).then((auth) => {
    return auth;
  });
};

function* getUserDatabyIdWatcher(action) {
  try {
    const response = yield call(getUserDatabyIdReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}
//
//
const getUserDatabySearchTextReq = (data) => {
  const { searchText, pageNo, name, order } = data.payload.reqData
  return fetchClient.get(`/search-member?searchQuery=${searchText}&page=${pageNo}&pageSize=10`, {}).then((auth) => {
    return auth;
  });
};

function* getUserDatabySearchTextWatcher(action) {
  try {
    const response = yield call(getUserDatabySearchTextReq, action);
    action.payload.onSuccess(response);
  } catch (err) {
    action.payload.onError(err);
  }
}
//
export default function* memberManagementModuleSaga() {
  yield takeLatest(CREATE_MEMBER_REQUEST, createMember);
  yield takeLatest(GET_MEMBER_DATA_REQUEST, getMemberData);
  yield takeLatest(DELETE_MEMBER_BY_ID_REQUEST, deleteMemberById);
  yield takeLatest(GET_MEMBER_BY_ID_REQUEST, memberDataById);
  yield takeLatest(UPDATE_MEMBER_BY_ID_REQUEST, updateMemberDataById);
  //
  yield takeLatest(GET_MEMBER_LIST_DATA_REQUEST, getMemberListDataWatcher);
  yield takeLatest(CREATE_NEW_MEMBER_REQ, createMemberListDataWatcher);
  yield takeLatest(DELETE_MEMBER_FROM_LIST_BY_ID, deleteMemberListDataWWatcher);
  yield takeLatest(UPDATE_MEMBER_FROM_LIST_BY_ID, updateMemberListDataWatcher);
  yield takeLatest(GET_USER_DATA_BY_USER_ID, getUserDatabyIdWatcher);
  //
  yield takeLatest(GET_USER_DATA_BY_SEARCH_TEXT, getUserDatabySearchTextWatcher);

}
