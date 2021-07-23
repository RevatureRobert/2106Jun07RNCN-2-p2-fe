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
      const res = await axios.get('https://tyder0c89e.execute-api.us-east-2.amazonaws.com/Prod/');
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
export const PostChirp = async (chirp: {}) => {
  try {
    await axios.post('/', chirp).catch((error) => console.log(error));
    return 'Chirp has been posted.';
  } catch (e) {
    return 'Error addinc chirp: ' + e;
  }
};

// makes an api call that deletes a chirp
export const DeleteChirp = async (timestamp: string) => {
  try {
    await axios.delete(`/${timestamp}`);
    return 'Chirp has been deleted';
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
  (timestamp: string, username: string) =>
  async (dispatch: Dispatch<RepliesActionTypes>) => {
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
export const PostComment = async (
  timestamp: string,
  username: string,
  chirp: [{}]
) => {
  try {
    await axios
      .put(`/${timestamp}/comments`, chirp)
      .catch((error) => console.log(error));
    return 'Comment has been posted.';
  } catch (e) {
    return 'Error adding comment: ' + e;
  }
};

// delete comment
export const DeleteComment = async (
  timestamp: string,
  cmttimestamp: string
) => {
  try {
    await axios
      .delete(`/${timestamp}/comments/${cmttimestamp}`)
      .catch((error) => console.log(error));
    return 'Comment has been deleted.';
  } catch (e) {
    return 'Error deleting comment: ' + e;
  }
};
