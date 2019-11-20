import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
  } from '../actions/index';
  
  const initialState = {
    users: [],
    isLoading: false,
    error: null,
    hasMore: true,
    userId: 1
  };
  
  export default function userReducer (state = initialState, action) {

    switch(action.type) {
      case FETCH_USERS_BEGIN:
        return {
          ...state,
          isLoading: true,
          error: null
        };
  
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          hasMore: action.payload.hasMore,
          users: [...state.users, ...action.payload.users],
          userId: action.payload.userId
        };
  
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error,
          users: []
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }