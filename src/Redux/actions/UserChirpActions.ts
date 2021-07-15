import axios from '../../components/axiosConfig';
import { Dispatch } from 'redux';
import {
  UserChirpsActionsTypes,
  USER_CHIRPS_FAIL,
  USER_CHIRPS_LOADING,
  USER_CHIRPS_SUCCESS,
} from '../types/UserChirpActionsTypes';

export const GetUsersChirps =
  (username: string) => async (dispatch: Dispatch<UserChirpsActionsTypes>) => {
    try {
      dispatch({
        type: USER_CHIRPS_LOADING,
      });

      const res = await axios.get(`/${username}`);
      dispatch({
        type: USER_CHIRPS_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: USER_CHIRPS_FAIL,
      });
    }
  };
