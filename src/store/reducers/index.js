
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import favUserReducer from './favUserReducer';

export default combineReducers({users: userReducer, favUsers: favUserReducer});
 