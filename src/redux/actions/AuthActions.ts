import { ThunkAction } from 'redux-thunk';
import { RootStore } from '../store/store';
import {
  SignInData,
  SignUpData,
  AuthActionTypes,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_VERIFICATION,
  SET_USER,
  SIGN_OUT,
  User
} from '../types/AuthActionsTypes';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

//Sign in User
export const signIn = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootStore, null, AuthActionTypes> => {
  return async (dispatch) => {
    try {
      const res: CognitoUser = await Auth.signIn(data.username, data.password);
      if (res) {
        const userData: User = {
          username: res.getUsername(),
<<<<<<< HEAD
          password: data.password
=======
          password: data.password,
          picture: `https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/${res.getUsername()}/myimages`
>>>>>>> 1e9173ede849d7e1e4cbe7583e370f88c7273e60
        };
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      onError();
      dispatch(setError(err.message));
      console.log(err);
    }
  };
};

export const signUp = (data: SignUpData, onError: () => void) => {
  return async () => {
    try {
      const res = await Auth.signUp(
        data.username,
        data.password,
        data.attributes?.email as string,
        data.attributes?.bio as string,
        data.attributes?.picture as string
      );
      console.log(res.user);
    } catch (err) {
      onError();
    }
  };
};

export const getVerification = (): ThunkAction<
  void,
  RootStore,
  null,
  AuthActionTypes
> => {
  return async (dispatch) => {
    dispatch({
      type: SET_VERIFICATION
    });
  };
};

export const logout = (): ThunkAction<
  void,
  RootStore,
  null,
  AuthActionTypes
> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await Auth.signOut();
      dispatch({
        type: SIGN_OUT
      });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

export const setError = (
  msg: string
): ThunkAction<void, RootStore, null, AuthActionTypes> => {
  return (dispatch) => {
    dispatch({ type: SET_ERROR, payload: msg });
  };
};

export const setSuccess = (
  msg: string
): ThunkAction<void, RootStore, null, AuthActionTypes> => {
  return (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: msg });
  };
};

export const setLoading = (
  value: boolean
): ThunkAction<void, RootStore, null, AuthActionTypes> => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: value });
  };
};
