import {
  CREATE_QUIZ_CATEGORY_FAILED,
  CREATE_QUIZ_CATEGORY_REQUEST,
  CREATE_QUIZ_CATEGORY_SUCCESS,
  DELETE_QUIZ_CATEGORY_BY_ID_FAILED,
  DELETE_QUIZ_CATEGORY_BY_ID_REQUEST,
  DELETE_QUIZ_CATEGORY_BY_ID_SUCCESS,
  GET_QUIZ_CATEGORY_BY_ID_FAILED,
  GET_QUIZ_CATEGORY_BY_ID_REQUEST,
  GET_QUIZ_CATEGORY_BY_ID_SUCCESS,
  GET_QUIZ_CATEGORY_FAILED,
  GET_QUIZ_CATEGORY_REQUEST,
  GET_QUIZ_CATEGORY_SUCCESS,
  UPDATE_QUIZ_CATEGORY_BY_ID_FAILED,
  UPDATE_QUIZ_CATEGORY_BY_ID_REQUEST,
  UPDATE_QUIZ_CATEGORY_BY_ID_SUCCESS,
} from '../action/action';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isDelete: false,
  createQuizCategoryData: null,
  categoryDataList: null,
  categoryId: null,
  categoryData: null,
  updatedCategoryData: null,
};

const quizCategoryModuleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_QUIZ_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_QUIZ_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        createQuizCategoryData: payload,
      };
    case CREATE_QUIZ_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        createQuizCategoryData: payload,
      };
    case GET_QUIZ_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        categoryDataList: payload,
      };
    case GET_QUIZ_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        categoryDataList: payload,
      };
    case GET_QUIZ_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUIZ_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        categoryData: payload,
      };
    case GET_QUIZ_CATEGORY_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        categoryData: payload,
      };
    case UPDATE_QUIZ_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_QUIZ_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updatedCategoryData: payload,
      };
    case UPDATE_QUIZ_CATEGORY_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        updatedCategoryData: payload,
      };
    case DELETE_QUIZ_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_QUIZ_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDelete: true,
        categoryId: payload,
      };
    case DELETE_QUIZ_CATEGORY_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        isDelete: true,
        categoryId: payload,
      };
    default:
      return state;
  }
};
export default quizCategoryModuleReducer;
