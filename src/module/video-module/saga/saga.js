/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
    FETCH_VIDEO_DATA_REQ,
    UPLOAD_VIDEO_DATA_REQ,
    UPDATE_VIDEO_REQ,
    DELETE_VIDEO_REQ
} from '../action/action';

const getAllVideoDataRequest = (data) => {
    return fetchClient.get(`/video`, {}).then((auth) => {
        return auth;
    });
};

function* getAllVideoDataWatcher(action) {
    try {
        const response = yield call(getAllVideoDataRequest, action);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const deleteVideoDataRequest = (data) => {
    return fetchClient.delete(`/video/${data.video_Id}`, {}).then((auth) => {
        return auth;
    });
};

function* deleteVideoDataWatcher(action) {
    try {
        const response = yield call(deleteVideoDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//

const uploadVideoDataRequest = (data) => {

    return fetchClient.post(`/video`, data.data).then((auth) => {
        return auth;
    });
    //
};

function* uploadVideoDataWatcher(action) {
    try {
        const response = yield call(uploadVideoDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
//

const updateVideoDataRequest = (data) => {
    //
    return fetchClient.put(`/video/${data.video_id}`, data.data).then((auth) => {
        return auth;
    });
    //
};

function* updateVideoDatawwatcher(action) {
    try {
        const response = yield call(updateVideoDataRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
export default function* videoModuleSaga() {
    yield takeLatest(FETCH_VIDEO_DATA_REQ, getAllVideoDataWatcher);
    yield takeLatest(DELETE_VIDEO_REQ, deleteVideoDataWatcher);
    yield takeLatest(UPLOAD_VIDEO_DATA_REQ, uploadVideoDataWatcher);
    yield takeLatest(UPDATE_VIDEO_REQ, updateVideoDatawwatcher);

}
