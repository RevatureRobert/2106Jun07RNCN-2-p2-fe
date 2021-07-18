import axios from '../axiosConfig';
import { Dispatch } from 'redux';
import {
  ChirpsActionsTypes,
  CHIRPS_FAIL,
  CHIRPS_LOADING,
  CHIRPS_SUCCESS,
  CHIRPS_POST,
} from '../types/ChirpActionsTypes';

// makes an api call that gets all chirps
export const GetAllChirps =
  () => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });
      const res = await axios.get('/chirps');
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data.Items,
      });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL,
      });
    }
  };

// makes an api call that gets a chirp
export const GetChirp =
  (timestamp: string) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });

      const res = await axios.get(`/chirps/${timestamp}`);
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data.Items,
      });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL,
      });
    }
  };

// gets all chirps by a user
export const GetUsersChirps =
  (username: string) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });

      const res = await axios.get(`/chirps/${username}`);
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data.Items,
      });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL,
      });
    }
  };

// makes an api call that posts a chirp
export const PostChirp = async (chirp: {}) => {
  console.log(chirp);
  try {
    await axios.post('/chirps', chirp).catch((error) => console.log(error));
    return 'Chirp has been posted.';
  } catch (e) {
    return 'Error: ' + e;
  }
};

// makes an api call that deletes a chirp
export const DeleteChirp =
  (timestamp: string) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });

      await axios
        .delete(`/chirps/${timestamp}`)
        .then((res) => {
          dispatch({
            type: CHIRPS_SUCCESS,
            payload: res.data,
          });
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL,
      });
    }
  };

// like a chirp
export const LikeChirp = async (timestamp: string, username: string) => {
  try {
    await axios
      .put(`/chirps/like/${timestamp}/${username}`)
      .catch((error) => console.log(error));
  } catch (e) {
    console.log(e);
  }
};

// unlick chirp
export const UnlikeChirp = async (timestamp: string, username: string) => {
  try {
    await axios
      .put(`/chirps/unlike/${timestamp}/${username}`)
      .catch((error) => console.log(error));
  } catch (e) {
    console.log(e);
  }
};
