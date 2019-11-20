export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

export const  fetchUsers = (userId = 1)=> {
	return dispatch => {
	  dispatch(fetchUsersBegin());
	  return fetch(`http://localhost:3000/posts?userId=${userId}`)
		.then(res => res.json())
		.then(json => {
		let Id = json.length && json[0].userId,
			hasMore = Id < 11;
			setTimeout(()=>{
				dispatch(fetchUsersSuccess(json, hasMore, Id));
			}, 3000)
		})
		.catch(error => dispatch(fetchUsersFailure(error)));
	};
  }

export function addToFavorite(user) {
	const action = {
		type: ADD_FAV,
		user
	}
	return action;
}

export function removeToFavorite(user) {
	const action = {
		type: REMOVE_FAV,
		user
	}

	return action;
}

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users, hasMore, userId) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users , hasMore, userId}
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
})