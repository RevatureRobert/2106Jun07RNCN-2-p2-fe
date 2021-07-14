export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SET_UNAUTHENTICATED';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_VERIFICATION = 'SET_VERIFICATION';

export interface User {
  username: string;
  password: string;
  email?: string;
  bio?: string;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  needVerification: boolean;
  loading: boolean;
  error: string;
  success: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  password: string;
  attributes?: {
    email: string;
    bio?: string;
    picture?: string;
  };
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export interface SetVerificationAction {
  type: typeof SET_VERIFICATION;
}

export interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthActionTypes =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetVerificationAction
  | SetSuccessAction;
