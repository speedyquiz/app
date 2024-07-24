import { POST_ADMIN_SIGNIN_FAILED, POST_ADMIN_SIGNIN_REQUEST, POST_ADMIN_SIGNIN_SUCCESS } from '../action/action';

const initialState = {
  isLoading: false,
  isSuccess: false,
  adminSignInData: null,
};

const authModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ADMIN_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case POST_ADMIN_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        adminSignInData: payload,
      };
    case POST_ADMIN_SIGNIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        adminSignInData: payload,
      };
    default:
      return state;
  }
};
export default authModuleReducer;
