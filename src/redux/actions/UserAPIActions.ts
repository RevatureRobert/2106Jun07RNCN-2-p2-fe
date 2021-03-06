import axios from '../axiosConfig';
import { Dispatch } from 'redux';
import {
  UserAPIActionTypes,
  UserAPIType,
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS,
} from '../types/UserAPIActionsTypes';

/**
 * Makes api call for bio corresponding to username
 *
 * @param username
 * @returns
 */
export const GetUserBio =
  (username: string) => async (dispatch: Dispatch<UserAPIActionTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const res = await axios.get(`/user/${username}`);
      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
      });
    }
  };

/**
 * Makes api call to update User bio
 *
 * @param chirp
 * @returns
 */
export const PostUserBio =
  (params: UserAPIType) => async (dispatch: Dispatch<UserAPIActionTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const body = { bio: params.bio };
      await axios
        .put(`/user/${params.username}/bio`, body)
        .then((res) => {
          dispatch({
            type: USER_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
      });
    }
  };

export const CreateUser =
  (user: {}) => async (dispatch: Dispatch<UserAPIActionTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      await axios
        .post(`/user`, user)
        .then((res) => {
          dispatch({
            type: USER_SUCCESS,
            payload: res.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
      });
    }
  };

export const DeleteUser =
  (user: string) => async (dispatch: Dispatch<UserAPIActionTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });
      const body = { data: { username: user } };
      await axios
        .delete(`/user/${user}`, body)
        .then((res) => {
          dispatch({
            type: USER_SUCCESS,
            payload: res.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
      });
    }
  };
