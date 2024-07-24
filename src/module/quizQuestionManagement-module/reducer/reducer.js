import {
  CREATE_QUIZ_QUESTION_FAILED,
  CREATE_QUIZ_QUESTION_REQUEST,
  CREATE_QUIZ_QUESTION_SUCCESS,
  DELETE_QUIZ_QUESTION_BY_ID_FAILED,
  DELETE_QUIZ_QUESTION_BY_ID_REQUEST,
  DELETE_QUIZ_QUESTION_BY_ID_SUCCESS,
  GET_QUIZ_QUESTION_BY_ID_FAILED,
  GET_QUIZ_QUESTION_BY_ID_REQUEST,
  GET_QUIZ_QUESTION_BY_ID_SUCCESS,
  GET_QUIZ_QUESTION_FAILED,
  GET_QUIZ_QUESTION_REQUEST,
  GET_QUIZ_QUESTION_SUCCESS,
  UPDATE_QUIZ_QUESTION_BY_ID_FAILED,
  UPDATE_QUIZ_QUESTION_BY_ID_REQUEST,
  UPDATE_QUIZ_QUESTION_BY_ID_SUCCESS,
  UPLOAD_EXCEL_FILE_FAILED,
  UPLOAD_EXCEL_FILE_REQUEST,
  UPLOAD_EXCEL_FILE_SUCCESS,
} from '../action/action';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isDelete: false,
  quizQuestionData: null,
  getQuizQuestionData: null,
  questionId: null,
  questionDocData: null,
  questionData: null,
  updateQuizQuestionData: null,
};

const quizQuestionManagementModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_QUIZ_QUESTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        quizQuestionData: payload,
      };
    case CREATE_QUIZ_QUESTION_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        quizQuestionData: payload,
      };
    case GET_QUIZ_QUESTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        getQuizQuestionData: payload,
      };
    case GET_QUIZ_QUESTION_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        getQuizQuestionData: payload,
      };
    case GET_QUIZ_QUESTION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        questionData: payload,
      };
    case GET_QUIZ_QUESTION_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        questionData: payload,
      };
    case UPDATE_QUIZ_QUESTION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_QUIZ_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updateQuizQuestionData: payload,
      };
    case UPDATE_QUIZ_QUESTION_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        updateQuizQuestionData: payload,
      };
    case DELETE_QUIZ_QUESTION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_QUIZ_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDelete: true,
        questionId: payload,
      };
    case DELETE_QUIZ_QUESTION_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isDelete: false,
        questionId: payload,
      };
    case UPLOAD_EXCEL_FILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_EXCEL_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionDocData: payload,
      };
    case UPLOAD_EXCEL_FILE_FAILED:
      return {
        ...state,
        isLoading: false,
        questionDocData: payload,
      };
    default:
      return state;
  }
};
export default quizQuestionManagementModuleReducer;
