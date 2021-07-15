import {
  ChirpsActionsTypes,
  ChirpsType,
  CHIRPS_FAIL,
  CHIRPS_LOADING,
  CHIRPS_SUCCESS
} from '../types/ChirpActionsTypes';

interface DefaultStateI {
  loading: boolean;
  chirps?: ChirpsType;
}

const defaultState: DefaultStateI = ({
  loading: false
});

const chirpsReducer = (
  state: DefaultStateI = defaultState,
  action: ChirpsActionsTypes  = {type: CHIRPS_SUCCESS, payload: [{
    username: "testUser1",
    body: "this is a chirp1",
    timestamp: "12345678901",
    likes: "why is likes a string?1",
    img: "this is a comment1"
}]}
): DefaultStateI => {
  switch (action.type) {
    case CHIRPS_FAIL:
      return ({
        loading: false
      });
    case CHIRPS_LOADING:
      return ({
        loading: true
      });
    case CHIRPS_SUCCESS:
      return ({
        loading: false,
        chirps: action.payload
      });
    default:
      return state;
  }
};

export default chirpsReducer;
