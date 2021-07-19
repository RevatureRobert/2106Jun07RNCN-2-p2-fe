import {
  AuthActionTypes,
  AuthState,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_VERIFICATION,
  SET_USER,
  SIGN_OUT,
} from '../types/AuthActionsTypes';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  needVerification: false,
  loading: false,
  error: '',
  success: '',
};

export default (state: AuthState = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
      };
    case SET_VERIFICATION:
      return {
        ...state,
        setVerification: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};
