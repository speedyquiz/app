export const POST_CMS_REQUEST = 'POST_CMS_REQUEST';
export const POST_CMS_SUCCESS = 'POST_CMS_SUCCESS';
export const POST_CMS_FAILED = 'POST_CMS_FAILED';
//
export const GET_HOME_PAGE_DATA_REQ = 'GET_HOME_PAGE_DATA_REQ';
//
export const GET_CMS_ABOUT_US_REQ = 'GET_CMS_ABOUT_US_REQ';
export const GET_CMS_ABOUT_US_UPDATE_REQ = 'GET_CMS_ABOUT_US_UPDATE_REQ';
//
export const GET_FAQ_DATA_REQ = 'GET_FAQ_DATA_REQ';
export const GET_FAQ_POST_DATA_REQ = 'GET_FAQ_POST_DATA_REQ';
//
export const getHomePageData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_HOME_PAGE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

//
export const getCMSAboutUsData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_CMS_ABOUT_US_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const getCMSAboutUsUpdateData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_CMS_ABOUT_US_UPDATE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//

export const getFaqData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_FAQ_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const postFaqData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_FAQ_POST_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})