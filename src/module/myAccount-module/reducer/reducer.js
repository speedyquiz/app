import { GET_ACCOUNT_PROFILE_FAILED, GET_ACCOUNT_PROFILE_REQUEST, GET_ACCOUNT_PROFILE_SUCCESS, UPDATE_ACCOUNT_PROFILE_BY_ID_FAILED, UPDATE_ACCOUNT_PROFILE_BY_ID_REQUEST, UPDATE_ACCOUNT_PROFILE_BY_ID_SUCCESS } from "../action/action";

const initialState = {
  isLoading: false,
  isSuccess: false,
  myAccountData: null,
  updatedAccountData:null
};

const myAccountModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACCOUNT_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ACCOUNT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        myAccountData: payload,
      };
    case GET_ACCOUNT_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        myAccountData: payload,
      };
    case UPDATE_ACCOUNT_PROFILE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_ACCOUNT_PROFILE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updatedAccountData: payload,
      };
    case UPDATE_ACCOUNT_PROFILE_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        updatedAccountData: payload,
      };
    default:
      return state;
  }
};
export default myAccountModuleReducer;
