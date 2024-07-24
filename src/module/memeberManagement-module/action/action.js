export const GET_MEMBER_DATA_REQUEST = 'GET_MEMBER_DATA_REQUEST';
export const GET_MEMBER_DATA_SUCCESS = 'GET_MEMBER_DATA_SUCCESS';
export const GET_MEMBER_DATA_FAILED = 'GET_MEMBER_DATA_FAILED';

export const DELETE_MEMBER_BY_ID_REQUEST = 'DELETE_MEMBER_BY_ID_REQUEST';
export const DELETE_MEMBER_BY_ID_SUCCESS = 'DELETE_MEMBER_BY_ID_SUCCESS';
export const DELETE_MEMBER_BY_ID_FAILED = 'DELETE_MEMBER_BY_ID_FAILED';

export const CREATE_MEMBER_REQUEST = 'CREATE_MEMBER_REQUEST';
export const CREATE_MEMBER_SUCCESS = 'CREATE_MEMBER_SUCCESS';
export const CREATE_MEMBER_FAILED = 'CREATE_MEMBER_FAILED';

export const GET_MEMBER_BY_ID_REQUEST = 'GET_MEMBER_BY_ID_REQUEST';
export const GET_MEMBER_BY_ID_SUCCESS = 'GET_MEMBER_BY_ID_SUCCESS';
export const GET_MEMBER_BY_ID_FAILED = 'GET_MEMBER_BY_ID_FAILED';

export const UPDATE_MEMBER_BY_ID_REQUEST = 'UPDATE_MEMBER_BY_ID_REQUEST';
export const UPDATE_MEMBER_BY_ID_SUCCESS = 'UPDATE_MEMBER_BY_ID_SUCCESS';
export const UPDATE_MEMBER_BY_ID_FAILED = 'UPDATE_MEMBER_BY_ID_FAILED';
//
export const GET_MEMBER_LIST_DATA_REQUEST = 'GET_MEMBER_LIST_DATA_REQUEST';
export const getMemberListData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_MEMBER_LIST_DATA_REQUEST,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const CREATE_NEW_MEMBER_REQ = 'CREATE_NEW_MEMBER_REQ';
export const createNewMemberData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: CREATE_NEW_MEMBER_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const DELETE_MEMBER_FROM_LIST_BY_ID = 'DELETE_MEMBER_FROM_LIST_BY_ID';
export const deleteMemberFromList = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: DELETE_MEMBER_FROM_LIST_BY_ID,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const UPDATE_MEMBER_FROM_LIST_BY_ID = 'UPDATE_MEMBER_FROM_LIST_BY_ID';
export const updateMemberFromList = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_MEMBER_FROM_LIST_BY_ID,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const GET_USER_DATA_BY_USER_ID = 'GET_USER_DATA_BY_USER_ID';
export const getUserDataByUserId = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_USER_DATA_BY_USER_ID,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

//
export const GET_USER_DATA_BY_SEARCH_TEXT = 'GET_USER_DATA_BY_SEARCH_TEXT';
export const getUserBySearchData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_USER_DATA_BY_SEARCH_TEXT,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})