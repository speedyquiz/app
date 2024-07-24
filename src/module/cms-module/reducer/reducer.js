import { POST_CMS_FAILED, POST_CMS_REQUEST, POST_CMS_SUCCESS } from "../action/action";

const initialState = {
  isLoading: false,
  isSuccess: false,
  cmsData: null,
};

const cmsModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_CMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case POST_CMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        cmsData: payload,
      };
    case POST_CMS_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        cmsData: payload,
      };
    default:
      return state;
  }
};
export default cmsModuleReducer;
