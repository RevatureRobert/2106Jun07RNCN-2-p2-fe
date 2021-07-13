import {
  UserChirpsActionsTypes,
  CHIRPS_FAIL,
  CHIRPS_LOADING,
  CHIRPS_SUCCESS,
  UserChirpsType
} from '../types/UserChirpActionsTypes';

interface DefaultStateI {
  loading: boolean;
  chirps?: UserChirpsType;
}

const defaultState: DefaultStateI = {
  loading: false
};

const UserChirpsReducer = (
  state: DefaultStateI = defaultState,
  action: UserChirpsActionsTypes
): DefaultStateI => {
  switch (action.type) {
    case CHIRPS_FAIL:
      return {
        loading: false
      };
    case CHIRPS_LOADING:
      return {
        loading: true
      };
    case CHIRPS_SUCCESS:
      return {
        loading: false,
        chirps: action.payload
      };
    default:
      return state;
  }
};

export default UserChirpsReducer;
