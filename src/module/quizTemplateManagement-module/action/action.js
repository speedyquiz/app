export const GET_QUIZ_TEMPLATE_REQUEST = 'GET_QUIZ_TEMPLATE_REQUEST';
export const GET_QUIZ_TEMPLATE_SUCCESS = 'GET_QUIZ_TEMPLATE_SUCCESS';
export const GET_QUIZ_TEMPLATE_FAILED = 'GET_QUIZ_TEMPLATE_FAILED';

export const CREATE_QUIZ_TEMPLATE_REQUEST = 'CREATE_QUIZ_TEMPLATE_REQUEST';
export const CREATE_QUIZ_TEMPLATE_SUCCESS = 'CREATE_QUIZ_TEMPLATE_SUCCESS';
export const CREATE_QUIZ_TEMPLATE_FAILED = 'CREATE_QUIZ_TEMPLATE_FAILED';

export const DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST = 'DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST';
export const DELETE_QUIZ_TEMPLATE_BY_ID_SUCCESS = 'DELETE_QUIZ_TEMPLATE_BY_ID_SUCCESS';
export const DELETE_QUIZ_TEMPLATE_BY_ID_FAILED = 'DELETE_QUIZ_TEMPLATE_BY_ID_FAILED';

export const GET_QUIZ_TEMPLATE_BY_ID_REQUEST = 'GET_QUIZ_TEMPLATE_BY_ID_REQUEST';
export const GET_QUIZ_TEMPLATE_BY_ID_SUCCESS = 'GET_QUIZ_TEMPLATE_BY_ID_SUCCESS';
export const GET_QUIZ_TEMPLATE_BY_ID_FAILED = 'GET_QUIZ_TEMPLATE_BY_ID_FAILED';

export const UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST = 'UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST';
export const UPDATE_QUIZ_TEMPLATE_BY_ID_SUCCESS = 'UPDATE_QUIZ_TEMPLATE_BY_ID_SUCCESS';
export const UPDATE_QUIZ_TEMPLATE_BY_ID_FAILED = 'UPDATE_QUIZ_TEMPLATE_BY_ID_FAILED';
//
// export const GET_QUIZ_TEMPLATE_DATA_REQUEST = 'GET_QUIZ_TEMPLATE_DATA_REQUEST';
// export const getQuizTemplageData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
//     type: GET_QUIZ_TEMPLATE_DATA_REQUEST,
//     payload: {
//         reqData,
//         onSuccess: onSuccessData,
//         onError: onErrorData,
//     }
// })
//
export const QUIZ_TEMPLATE_CREATE_DATA_REQ = 'QUIZ_TEMPLATE_CREATE_DATA_REQ';
export const createQuizTemplateData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: QUIZ_TEMPLATE_CREATE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const QUIZ_TEMPLATE_UPDATE_DATA_REQ = 'QUIZ_TEMPLATE_UPDATE_DATA_REQ';
export const updateQuizTemplateData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: QUIZ_TEMPLATE_UPDATE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const UPDATE_MODAL_DATA_REQ = 'UPDATE_MODAL_DATA_REQ';
export const updateModalData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_MODAL_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const UPDATE_TEMPLATE_STATUS_REQ = 'UPDATE_TEMPLATE_STATUS_REQ';
export const updateTemplateStatusData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_TEMPLATE_STATUS_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})