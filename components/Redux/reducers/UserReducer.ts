import {
  UserAPIActionTypes,
  UserAPIType,
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS
} from '../types/UserAPIActionsTypes';

interface DefaultStateI {
  loading: boolean;
  user?: UserAPIType;
}

const defaultState: DefaultStateI = {
  loading: false
};

const userReducer = (
  state: DefaultStateI = defaultState,
  action: UserAPIActionTypes
): DefaultStateI => {
  switch (action.type) {
    case USER_FAIL:
      return {
        loading: false
      };
    case USER_LOADING:
      return {
        loading: true
      };
    case USER_SUCCESS:
      return {
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
