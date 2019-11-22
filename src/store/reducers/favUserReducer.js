import ActionConstant from '../../constants/action.constant';


const initialState = {
    favUsers: [],
    isLoading: false,
    error: null,
};

export default function favUserReducer(state = initialState, action) {
    let { FETCH_FAVOURITE_USERS_BEGIN, FETCH_FAVOURITE_USERS_SUCCESS, FETCH_FAVOURITE_USERS_FAILURE,
        PUT_FAVOURITE_USERS_SUCCESS, ADD_FAVOURITE_USERS_SUCCESS } = ActionConstant;
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
            let id = action.payload.user.id;
            let favList = [];
            favList = state.favUsers.filter(itm => itm.id !== id);
            return {
                ...state,
                favUsers: favList || []
            };
        case ADD_FAVOURITE_USERS_SUCCESS:
            return {
                ...state,
                favUsers: [...state.favUsers, ...[action.payload.user]] || []
            };
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}