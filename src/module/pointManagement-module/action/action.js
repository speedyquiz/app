export const FETCH_ALL_POINTS_DATA_REQ = 'FETCH_ALL_POINTS_DATA_REQ';
export const getAllPointsDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_ALL_POINTS_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const UPDATE_ALL_POINTS_DATA_REQ = 'UPDATE_ALL_POINTS_DATA_REQ';
export const updatePointDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_ALL_POINTS_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})