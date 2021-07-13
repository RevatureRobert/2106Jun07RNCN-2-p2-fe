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

const defaultState: DefaultStateI = {
  loading: false
};

const chirpsReducer = (
  state: DefaultStateI = defaultState,
  action: ChirpsActionsTypes
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

export default chirpsReducer;
