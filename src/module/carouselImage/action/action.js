export const FETCH_CAROUSEL_DATA_REQ = 'FETCH_CAROUSEL_DATA_REQ';
export const getCarouselReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: FETCH_CAROUSEL_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const CREATE_CAROUSEL_DATA_REQ = 'CREATE_CAROUSEL_DATA_REQ';
export const createCarouselImageReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: CREATE_CAROUSEL_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})
//
export const DELETE_CAROUSEL_IMAGE_REQ = 'DELETE_CAROUSEL_IMAGE_REQ';
export const deleteCarouselImageReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: DELETE_CAROUSEL_IMAGE_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})

//
export const UPDATE_CAROUSEL_DATA_REQ = 'UPDATE_CAROUSEL_DATA_REQ';
export const updateCarouselImageReq = ({ reqData = {}, onSuccessData, onErrorData }) => ({
    type: UPDATE_CAROUSEL_DATA_REQ,
    payload: {
        reqData,
        onSuccess: onSuccessData,
        onError: onErrorData,
    }
})