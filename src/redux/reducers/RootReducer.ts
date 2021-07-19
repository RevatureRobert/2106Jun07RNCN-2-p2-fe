import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import chirpsReducer from './ChirpReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chirps: chirpsReducer,
});

export default RootReducer;
