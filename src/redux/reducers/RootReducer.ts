import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import chirpsReducer from './ChirpReducer';
import repliesReducer from './RepliesReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chirps: chirpsReducer,
  replies: repliesReducer,
});

export default RootReducer;
