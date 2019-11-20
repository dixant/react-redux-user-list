import {
    FETCH_FAVOURITE_USERS_BEGIN,
    FETCH_FAVOURITE_USERS_SUCCESS,
    FETCH_FAVOURITE_USERS_FAILURE,
    PUT_FAVOURITE_USERS_SUCCESS,
} from '../actions/index';

const initialState = {
    favUsers: [],
    isLoading: false,
    error: null,
};

export default function favUserReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_FAVOURITE_USERS_BEGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case FETCH_FAVOURITE_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                favUsers: [...action.payload.favUsers]
            };

        case FETCH_FAVOURITE_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
                favUsers: []
            };
        case PUT_FAVOURITE_USERS_SUCCESS:
            return {
                ...state,
                favUsers: []
            };
            
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}