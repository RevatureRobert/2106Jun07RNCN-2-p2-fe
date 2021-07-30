import axios from '../axiosConfig';
import { Dispatch } from 'redux';
import {
  ChirpsActionsTypes,
  CHIRPS_FAIL,
  CHIRPS_LOADING,
  CHIRPS_SUCCESS,
} from '../types/ChirpActionsTypes';
import {
  RepliesActionTypes,
  REPLIES_FAIL,
  REPLIES_LOADING,
  REPLIES_SUCCESS,
} from '../types/RepliesActionTypes';

// makes an api call that gets all chirps
export const GetAllChirps =
  () => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });
      const res = await axios.get('/');
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: CHIRPS_FAIL,
      });
    }
  };

// makes an api call that posts a chirp
export const PostChirp =
  (chirp: {}) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });
      await axios.post('/', chirp);
      const res = await axios.get('/');
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data,
      });
      return 'Chirp has been posted.';
    } catch (e) {
      return 'Error adding chirp: ' + e;
    }
  };

// makes an api call that deletes a chirp
export const DeleteChirp =
  (timestamp: string) => async (dispatch: Dispatch<ChirpsActionsTypes>) => {
    try {
      dispatch({
        type: CHIRPS_LOADING,
      });
      await axios.delete(`/${timestamp}`);
      const res = await axios.get('/');
      dispatch({
        type: CHIRPS_SUCCESS,
        payload: res.data,
      });
      return 'Chirp has been deleted.';
    } catch (e) {
      return 'Error deleting chirp: ' + e;
    }
  };

// like a chirp
export const LikeChirp = async (timestamp: string, username: string) => {
  try {
    await axios
      .put(`/like/${timestamp}/${username}`)
      .catch((error) => console.log(error));
  } catch (e) {
    console.log(e);
  }
};

// unlike chirp
export const UnlikeChirp = async (timestamp: string, username: string) => {
  try {
    await axios
      .put(`/unlike/${timestamp}/${username}`)
      .catch((error) => console.log(error));
  } catch (e) {
    console.log(e);
  }
};

// get replies
export const GetReplies =
  (timestamp: string) => async (dispatch: Dispatch<RepliesActionTypes>) => {
    try {
      dispatch({
        type: REPLIES_LOADING,
      });
      const res = await axios.get(`/${timestamp}/comments`);
      dispatch({
        type: REPLIES_SUCCESS,
        payload: res.data.Items[0].comments,
      });
    } catch (e) {
      dispatch({
        type: REPLIES_FAIL,
      });
    }
  };

// post replies
export const PostComment =
  (timestamp: string, chirp: [{}]) =>
  async (dispatch: Dispatch<RepliesActionTypes>) => {
    try {
      dispatch({
        type: REPLIES_LOADING,
      });

      await axios.put(`/${timestamp}/comments`, chirp);
      const res = await axios.get(`/${timestamp}/comments`);
      dispatch({
        type: REPLIES_SUCCESS,
        payload: res.data.Items[0].comments,
      });
    } catch (e) {
      dispatch({
        type: REPLIES_FAIL,
      });
    }
  };

// delete comment
export const DeleteComment =
  (timestamp: string, cmttimestamp: string) =>
  async (dispatch: Dispatch<RepliesActionTypes>) => {
    try {
      dispatch({
        type: REPLIES_LOADING,
      });

      await axios.delete(`/${timestamp}/comments/${cmttimestamp}`);
      const res = await axios.get(`/${timestamp}/comments`);
      dispatch({
        type: REPLIES_SUCCESS,
        payload: res.data.Items[0].comments,
      });
    } catch (e) {
      dispatch({
        type: REPLIES_FAIL,
      });
    }
  };
