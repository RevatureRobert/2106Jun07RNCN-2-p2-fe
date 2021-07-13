import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import chirpsReducer from './ChirpReducer';
import userChirpsReducer from './UserChirpReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chirps: chirpsReducer,
  userChirp: userChirpsReducer
});

export default RootReducer;
