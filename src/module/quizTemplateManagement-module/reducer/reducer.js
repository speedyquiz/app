import {
  CREATE_QUIZ_TEMPLATE_FAILED,
  CREATE_QUIZ_TEMPLATE_REQUEST,
  CREATE_QUIZ_TEMPLATE_SUCCESS,
  DELETE_QUIZ_TEMPLATE_BY_ID_FAILED,
  DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST,
  DELETE_QUIZ_TEMPLATE_BY_ID_SUCCESS,
  GET_QUIZ_TEMPLATE_BY_ID_FAILED,
  GET_QUIZ_TEMPLATE_BY_ID_REQUEST,
  GET_QUIZ_TEMPLATE_BY_ID_SUCCESS,
  GET_QUIZ_TEMPLATE_FAILED,
  GET_QUIZ_TEMPLATE_REQUEST,
  GET_QUIZ_TEMPLATE_SUCCESS,
  UPDATE_QUIZ_TEMPLATE_BY_ID_FAILED,
  UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST,
  UPDATE_QUIZ_TEMPLATE_BY_ID_SUCCESS,
} from '../action/action';

const initialState = {
  isLoading: false,
  isSuccess: false,
  quizTempateData: null,
  templateId: null,
  templateData: null,
  updateQuizTemplateData: null,
};

const quizTemplateManagementModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_QUIZ_TEMPLATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_TEMPLATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        quizTempateData: payload,
      };
    case GET_QUIZ_TEMPLATE_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        quizTempateData: payload,
      };
    case GET_QUIZ_TEMPLATE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_TEMPLATE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        templateData: payload,
      };
    case GET_QUIZ_TEMPLATE_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        templateData: payload,
      };
    case CREATE_QUIZ_TEMPLATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_QUIZ_TEMPLATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        quizTempateData: payload,
      };
    case CREATE_QUIZ_TEMPLATE_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        quizTempateData: payload,
      };
    case UPDATE_QUIZ_TEMPLATE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_QUIZ_TEMPLATE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updateQuizTemplateData: payload,
      };
    case UPDATE_QUIZ_TEMPLATE_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        updateQuizTemplateData: payload,
      };
    case DELETE_QUIZ_TEMPLATE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_QUIZ_TEMPLATE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDelete: true,
        templateId: payload,
      };
    case DELETE_QUIZ_TEMPLATE_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isDelete: false,
        templateId: payload,
      };
    default:
      return state;
  }
};
export default quizTemplateManagementModuleReducer;
