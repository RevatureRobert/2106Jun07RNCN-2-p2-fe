import axios from '../../components/axiosConfig';
import { Dispatch } from 'redux';
import {
  ChirpsActionsTypes,
  CHIRPS_FAIL,
  CHIRPS_LOADING,
  CHIRPS_SUCCESS
} from '../types/ChirpActionsTypes';

// makes an api call that gets all chirps
export const GetAllChirps =
  () => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING
      });
      const res = await axios.get('/chirp/all');
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL
      });
    }
  };

// makes an api call that gets a chirp
export const GetChirp =
  (timestamp: string) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING
      });

      const res = await axios.get('/chirp/${timestamp}');
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL
      });
    }
  };

// makes an api call that posts a chirp
export const PostChirp =  async (chirp: {}) => {
    try {
      await axios.post('/chirp', chirp)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

      return 'Chirp has been posted.';
    } catch (e) {
      return 'Error: ' + e;
    }
  };

// makes an api call that posts a chirp
export const DeleteChirp =
  (timestamp: string) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING
      });

      await axios
        .delete(`/chirp/${timestamp}`)
        .then(function (res) {
          dispatch({
            type: CHIRPS_SUCCESS,
            payload: res.data
          });
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL
      });
    }
  };
