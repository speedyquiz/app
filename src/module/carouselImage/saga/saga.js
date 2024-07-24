/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import fetchClient from 'src/api/fetchClient';
import apiUrl from 'src/constant/common/apiConstant';
import {
    FETCH_CAROUSEL_DATA_REQ,
    CREATE_CAROUSEL_DATA_REQ,
    DELETE_CAROUSEL_IMAGE_REQ,
    UPDATE_CAROUSEL_DATA_REQ
} from '../action/action';

const getAllCarouselImageRequest = (data) => {
    return fetchClient.get(`/carousel`, {}).then((auth) => {
        return auth;
    });
};

function* getAllCarouselImageWatcher(action) {
    try {
        const response = yield call(getAllCarouselImageRequest, action);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const addCarouselImageRequest = (data) => {
    return fetchClient.post(`/carousel`, data).then((auth) => {
        return auth;
    });
};

function* addCarouselImageWatcher(action) {
    try {
        const response = yield call(addCarouselImageRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const deleteCarouselImageRequest = (data) => {
    return fetchClient.delete(`/carousel/${data.imageId}`, {}).then((auth) => {
        return auth;
    });
};

function* deleteCarouselImageWatcher(action) {
    try {
        const response = yield call(deleteCarouselImageRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
const updateCarouselImageRequest = (data) => {
    return fetchClient.put(`/carousel/${data.id}`, data.request).then((auth) => {
        return auth;
    });
};

function* updateCarouselImageWatcher(action) {
    try {
        const response = yield call(updateCarouselImageRequest, action.payload.reqData);
        action.payload.onSuccess(response);
    } catch (err) {
        action.payload.onError(err);
    }
}
//
export default function* carouselModuleSaga() {
    yield takeLatest(FETCH_CAROUSEL_DATA_REQ, getAllCarouselImageWatcher);
    yield takeLatest(CREATE_CAROUSEL_DATA_REQ, addCarouselImageWatcher);
    yield takeLatest(DELETE_CAROUSEL_IMAGE_REQ, deleteCarouselImageWatcher);
    yield takeLatest(UPDATE_CAROUSEL_DATA_REQ, updateCarouselImageWatcher);
}
