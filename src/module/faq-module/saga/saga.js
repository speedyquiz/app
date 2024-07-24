/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
    FETCH_FAQ_REQ,
    CREATE_FAQ_REQ,
    UPDATE_FAQ_REQ,
    DELETE_FAQ_REQ
} from '../action/action';

const getAllFaqDataRequest = (data) => {
    return fetchClient.get(`/faq`, {}).then((auth) => {
        return auth;
    });
};

function* getAllFaqDataWatcher(action) {
    try {
        const response = yield call(getAllFaqDataRequest, action);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const deleteFaqDataRequest = (data) => {
    return fetchClient.delete(`/faq/${data.faqId}`, {}).then((auth) => {
        return auth;
    });
};

function* deleteFaqDataWatcher(action) {
    try {
        const response = yield call(deleteFaqDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const createFaqDataRequest = (data) => {
    return fetchClient.post(`/faq`, data).then((auth) => {
        return auth;
    });
};

function* createFaqDataWatcher(action) {
    try {
        const response = yield call(createFaqDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
//
const updateFaqDataRequest = (data) => {
    return fetchClient.put(`/faq/${data.faqId}`, data.bodyData).then((auth) => {
        return auth;
    });
};

function* updateFaqDataWatcher(action) {
    try {
        const response = yield call(updateFaqDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
export default function* faqModuleSaga() {
    yield takeLatest(FETCH_FAQ_REQ, getAllFaqDataWatcher);
    yield takeLatest(CREATE_FAQ_REQ, createFaqDataWatcher);
    yield takeLatest(UPDATE_FAQ_REQ, updateFaqDataWatcher);
    yield takeLatest(DELETE_FAQ_REQ, deleteFaqDataWatcher);
}
