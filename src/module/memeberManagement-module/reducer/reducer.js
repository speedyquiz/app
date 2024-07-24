import { CREATE_MEMBER_FAILED, CREATE_MEMBER_REQUEST, CREATE_MEMBER_SUCCESS, DELETE_MEMBER_BY_ID_FAILED, DELETE_MEMBER_BY_ID_REQUEST, DELETE_MEMBER_BY_ID_SUCCESS, GET_MEMBER_BY_ID_FAILED, GET_MEMBER_BY_ID_REQUEST, GET_MEMBER_BY_ID_SUCCESS, GET_MEMBER_DATA_FAILED, GET_MEMBER_DATA_REQUEST, GET_MEMBER_DATA_SUCCESS, UPDATE_MEMBER_BY_ID_FAILED, UPDATE_MEMBER_BY_ID_REQUEST, UPDATE_MEMBER_BY_ID_SUCCESS } from "../action/action";

const initialState = {
  isLoading: false,
  isSuccess: false,
  memberData: null,
  memberId: null,
  createMemberData: null,
  memberDataById: null,
  updatedMemberData: null,
};

const memberManagementModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_MEMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        createMemberData: payload,
      };
    case CREATE_MEMBER_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        createMemberData: payload,
      };
    case GET_MEMBER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MEMBER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        memberData: payload,
      };
    case GET_MEMBER_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        memberData: payload,
      };
      case GET_MEMBER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        memberDataById: payload,
      };
    case GET_MEMBER_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        memberDataById: payload,
      };
      case DELETE_MEMBER_BY_ID_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case DELETE_MEMBER_BY_ID_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          memberId: payload,
        };
      case DELETE_MEMBER_BY_ID_FAILED:
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          memberId: payload,
        };
        case UPDATE_MEMBER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updatedMemberData: payload,
      };
    case UPDATE_MEMBER_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        updatedMemberData: payload,
      };
    default:
      return state;
  }
};
export default memberManagementModuleReducer;
