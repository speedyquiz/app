import { GET_QUIZ_DATA_FAILED, GET_QUIZ_DATA_REQUEST, GET_QUIZ_DATA_SUCCESS, GET_WINNER_DATA_BY_ID_FAILED, GET_WINNER_DATA_BY_ID_REQUEST, GET_WINNER_DATA_BY_ID_SUCCESS } from "../action/action";

const initialState = {
  isLoading: false,
  isSuccess: false,
  quizDataList: null,
  quizTemplateDataById:null
};

const winnerManagementModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_QUIZ_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        quizDataList: payload,
      };
    case GET_QUIZ_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        quizDataList: payload,
      };
    case GET_WINNER_DATA_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WINNER_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        quizTemplateDataById: payload,
      };
    case GET_WINNER_DATA_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        quizTemplateDataById: payload,
      };
    default:
      return state;
  }
};
export default winnerManagementModuleReducer;
