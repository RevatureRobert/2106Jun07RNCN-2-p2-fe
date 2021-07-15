import {
  UserChirpsActionsTypes,
  USER_CHIRPS_FAIL,
  USER_CHIRPS_LOADING,
  USER_CHIRPS_SUCCESS,
  UserChirpsType,
} from '../types/UserChirpActionsTypes';

interface DefaultStateI {
  loading: boolean;
  userChirps?: UserChirpsType;
}

const defaultState: DefaultStateI = {
  loading: false,
};

const UserChirpsReducer = (
  state: DefaultStateI = defaultState,
  action: UserChirpsActionsTypes
): DefaultStateI => {
  switch (action.type) {
    case USER_CHIRPS_FAIL:
      return {
        loading: false,
      };
    case USER_CHIRPS_LOADING:
      return {
        loading: true,
      };
    case USER_CHIRPS_SUCCESS:
      return {
        loading: false,
        userChirps: action.payload,
      };
    default:
      return state;
  }
};

export default UserChirpsReducer;
