import {
  RepliesActionTypes,
  RepliesType,
  REPLIES_FAIL,
  REPLIES_LOADING,
  REPLIES_SUCCESS,
  REPLIES_DELETE,
  REPLIES_POST,
} from '../types/RepliesActionTypes';

interface DefaultStateI {
  loading: boolean;
  replies?: RepliesType;
}

const defaultState: DefaultStateI = {
  loading: false,
};

const repliesReducer = (
  state: DefaultStateI = defaultState,
  action: RepliesActionTypes
): DefaultStateI => {
  switch (action.type) {
    case REPLIES_FAIL:
      return {
        loading: false,
      };
    case REPLIES_LOADING:
      return {
        loading: true,
      };
    case REPLIES_SUCCESS:
      return {
        loading: false,
        replies: action.payload,
      };
    case REPLIES_POST:
      return {
        loading: false,
        replies: action.payload,
      };
    case REPLIES_DELETE:
      return {
        loading: false,
        replies: action.payload,
      };
    default:
      return state;
  }
};

export default repliesReducer;
