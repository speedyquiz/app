export const CREATE_QUIZ_QUESTION_REQUEST = 'CREATE_QUIZ_QUESTION_REQUEST';
export const CREATE_QUIZ_QUESTION_SUCCESS = 'CREATE_QUIZ_QUESTION_SUCCESS';
export const CREATE_QUIZ_QUESTION_FAILED = 'CREATE_QUIZ_QUESTION_FAILED';

export const GET_QUIZ_QUESTION_REQUEST = 'GET_QUIZ_QUESTION_REQUEST';
export const GET_QUIZ_QUESTION_SUCCESS = 'GET_QUIZ_QUESTION_SUCCESS';
export const GET_QUIZ_QUESTION_FAILED = 'GET_QUIZ_QUESTION_FAILED';

export const GET_QUIZ_QUESTION_BY_ID_REQUEST = 'GET_QUIZ_QUESTION_BY_ID_REQUEST';
export const GET_QUIZ_QUESTION_BY_ID_SUCCESS = 'GET_QUIZ_QUESTION_BY_ID_SUCCESS';
export const GET_QUIZ_QUESTION_BY_ID_FAILED = 'GET_QUIZ_QUESTION_BY_ID_FAILED';

export const UPDATE_QUIZ_QUESTION_BY_ID_REQUEST = 'UPDATE_QUIZ_QUESTION_BY_ID_REQUEST';
export const UPDATE_QUIZ_QUESTION_BY_ID_SUCCESS = 'UPDATE_QUIZ_QUESTION_BY_ID_SUCCESS';
export const UPDATE_QUIZ_QUESTION_BY_ID_FAILED = 'UPDATE_QUIZ_QUESTION_BY_ID_FAILED';

export const DELETE_QUIZ_QUESTION_BY_ID_REQUEST = 'DELETE_QUIZ_QUESTION_BY_ID_REQUEST';
export const DELETE_QUIZ_QUESTION_BY_ID_SUCCESS = 'DELETE_QUIZ_QUESTION_BY_ID_SUCCESS';
export const DELETE_QUIZ_QUESTION_BY_ID_FAILED = 'DELETE_QUIZ_QUESTION_BY_ID_FAILED';

export const UPLOAD_EXCEL_FILE_REQUEST = 'UPLOAD_EXCEL_FILE_REQUEST';
export const UPLOAD_EXCEL_FILE_SUCCESS = 'UPLOAD_EXCEL_FILE_SUCCESS';
export const UPLOAD_EXCEL_FILE_FAILED = 'UPLOAD_EXCEL_FILE_FAILED';
//
export const GET_QUESTION_SET_BY_CATEGORY_ID = 'GET_QUESTION_SET_BY_CATEGORY_ID';
export const getQuesstionSetByCategoryId = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_QUESTION_SET_BY_CATEGORY_ID,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const GET_QUESTION_SET_ALL_REQ = 'GET_QUESTION_SET_ALL_REQ';
export const getQuesstionSetAllData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_QUESTION_SET_ALL_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

//
export const GET_QUESTION_PAGINATION_REQ = 'GET_QUESTION_PAGINATION_REQ';
export const getquestionPaginationReqData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_QUESTION_PAGINATION_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const FETCH_QUESTION_BY_CATEGORY_ID_REQ = 'FETCH_QUESTION_BY_CATEGORY_ID_REQ';
export const fetchquestionByCategoryId = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_QUESTION_BY_CATEGORY_ID_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const BULK_IMPORT_QUESSTION_DATA_REQ = 'BULK_IMPORT_QUESSTION_DATA_REQ';
export const uploadQuestionByCategoryData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: BULK_IMPORT_QUESSTION_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const DELETE_QUESTION_BY_ID = 'DELETE_QUESTION_BY_ID';
export const deleteQuestionByIdData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: DELETE_QUESTION_BY_ID,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const UPDATE_QUESTION_BY_ID = 'UPDATE_QUESTION_BY_ID';
export const updateQuestionByIdData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_QUESTION_BY_ID,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const addNewQuestionByIdData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: ADD_NEW_QUESTION,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const FETCH_ALL_QUIZ_CATEGORY = 'FETCH_ALL_QUIZ_CATEGORY';
export const fetchQuizCategoryData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_ALL_QUIZ_CATEGORY,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const SEARCH_QUESSTION_BY_TEXT = 'SEARCH_QUESSTION_BY_TEXT';
export const fetchQuestionByText = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: SEARCH_QUESSTION_BY_TEXT,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const DOWNLOAD_FILE_BY_CATEGORY_SELECTION = 'DOWNLOAD_FILE_BY_CATEGORY_SELECTION';
export const getDownloadFileByCategoryData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: DOWNLOAD_FILE_BY_CATEGORY_SELECTION,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

//
export const UPLOAD_MULTIPLE_IMAGE_FOR_CATEGORY = 'UPLOAD_MULTIPLE_IMAGE_FOR_CATEGORY';
export const uploadMultipleImageForCategory = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPLOAD_MULTIPLE_IMAGE_FOR_CATEGORY,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})