export const FETCH_VIDEO_DATA_REQ = 'FETCH_VIDEO_DATA_REQ';
export const getVideoDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_VIDEO_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const UPLOAD_VIDEO_DATA_REQ = 'UPLOAD_VIDEO_DATA_REQ';
export const uploadVideoDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPLOAD_VIDEO_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const UPDATE_VIDEO_REQ = 'UPDATE_VIDEO_REQ';
export const updateVideoDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_VIDEO_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const DELETE_VIDEO_REQ = 'DELETE_VIDEO_REQ';
export const deleteFVideoDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: DELETE_VIDEO_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})