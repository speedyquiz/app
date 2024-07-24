export const FETCH_FAQ_REQ = 'FETCH_FAQ_REQ';
export const getAllFaqData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_FAQ_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const CREATE_FAQ_REQ = 'CREATE_FAQ_REQ';
export const createFAQdata = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: CREATE_FAQ_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const UPDATE_FAQ_REQ = 'UPDATE_FAQ_REQ';
export const updateFAQdata = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_FAQ_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
export const DELETE_FAQ_REQ = 'DELETE_FAQ_REQ';
export const deleteFAQData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: DELETE_FAQ_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})