/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
    FETCH_ALL_POINTS_DATA_REQ,
    UPDATE_ALL_POINTS_DATA_REQ
} from '../action/action';

const getAllPointDataRequest = (data) => {
    return fetchClient.get(`/point`, {}).then((auth) => {
        return auth;
    });
};

function* getAllPointDataWatcher(action) {
    try {
        const response = yield call(getAllPointDataRequest, action);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const updatePointDataRequest = (data) => {
    //
    return fetchClient.put(`/point`, data).then((auth) => {
        return auth;
    });
    //
};

function* updatePointDataWatcher(action) {
    try {
        const response = yield call(updatePointDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
export default function* pointModuleSaga() {
    yield takeLatest(FETCH_ALL_POINTS_DATA_REQ, getAllPointDataWatcher);
    yield takeLatest(UPDATE_ALL_POINTS_DATA_REQ, updatePointDataWatcher);
}
