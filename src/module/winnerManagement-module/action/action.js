export const GET_QUIZ_DATA_REQUEST = 'GET_QUIZ_DATA_REQUEST';
export const GET_QUIZ_DATA_SUCCESS = 'GET_QUIZ_DATA_SUCCESS';
export const GET_QUIZ_DATA_FAILED = 'GET_QUIZ_DATA_FAILED';

export const GET_WINNER_DATA_BY_ID_REQUEST = 'GET_WINNER_DATA_BY_ID_REQUEST';
export const GET_WINNER_DATA_BY_ID_SUCCESS = 'GET_WINNER_DATA_BY_ID_SUCCESS';
export const GET_WINNER_DATA_BY_ID_FAILED = 'GET_WINNER_DATA_BY_ID_FAILED';
//
export const GET_WINNET_QUIZ_REQUEST = 'GET_WINNET_QUIZ_REQUEST';
export const GET_WINNET_QUIZ_BY_ID_REQUEST = 'GET_WINNET_QUIZ_BY_ID_REQUEST';
export const GET_WINNET_QUIZ_TEMPLATE_REQUEST = 'GET_WINNET_QUIZ_TEMPLATE_REQUEST';
export const GET_WINNET_QUIZ_PLAYER_DATA_REQUEST = 'GET_WINNET_QUIZ_PLAYER_DATA_REQUEST';
// http://54.201.160.69:9205/quiz-template
//

export const getWinnerQuizRequestData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_WINNET_QUIZ_REQUEST,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const getQuizWinnerTemplateData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_WINNET_QUIZ_TEMPLATE_REQUEST,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const getWinnerQuizByIDRequestData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_WINNET_QUIZ_BY_ID_REQUEST,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

export const getWinnerQuizPlayerDataRequestData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: GET_WINNET_QUIZ_PLAYER_DATA_REQUEST,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})