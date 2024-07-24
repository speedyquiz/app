export const FETCH_ALL_TRACK_PAAYOUT_DATA_REQ = 'FETCH_ALL_TRACK_PAAYOUT_DATA_REQ';
export const fetchTrackPayoutData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_ALL_TRACK_PAAYOUT_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const FETCH_TRACK_PAYOUT_BY_TEMPLATE_REQ = 'FETCH_TRACK_PAYOUT_BY_TEMPLATE_REQ';
export const fetchTrackPayoutByTemplateData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_TRACK_PAYOUT_BY_TEMPLATE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const FETCH_ALL_TEMPLATE_DATA_REQ = 'FETCH_ALL_TEMPLATE_DATA_REQ';
export const fetchAllTemplateData = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_ALL_TEMPLATE_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const FETCH_ALL_LEADER_BOARD_DATA_REQ = 'FETCH_ALL_LEADER_BOARD_DATA_REQ';
export const fetchAllLeaderBoardDataReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_ALL_LEADER_BOARD_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
