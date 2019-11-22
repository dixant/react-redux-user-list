export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_FAVOURITE_USERS_BEGIN = 'FETCH_FAVOURITE_USERS_BEGIN';
export const FETCH_FAVOURITE_USERS_SUCCESS = 'FETCH_FAVOURITE_USERS_SUCCESS';


export const FETCH_FAVOURITE_USERS_FAILURE = 'FETCH_FAVOURITE_USERS_FAILURE';
export const PUT_FAVOURITE_USERS_SUCCESS = 'PUT_FAVOURITE_USERS_SUCCESS';
export const PUT_USERS_SUCCESS = 'PUT_USERS_SUCCESS';
export const ADD_FAVOURITE_USERS_SUCCESS = 'ADD_FAVOURITE_USERS_SUCCESS';

export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';

export const fetchUsers = (userId = 1) => {
	return dispatch => {
		dispatch(fetchUsersBegin());
		return fetch(`http://localhost:3000/posts?userId=${userId}`)
			.then(res => res.json())
			.then(json => {
				let Id = json.length && json[0].userId,
					hasMore = Id + 1 < 11;
				setTimeout(() => {
					dispatch(fetchUsersSuccess(json, hasMore, Id));
				}, 3000)
			})
			.catch(error => dispatch(fetchUsersFailure(error)));
	};
}
export const fetchFavouriteUsers = () => {
	return dispatch => {
		dispatch(fetchFavouriteUsersBegin());
		return fetch(`http://localhost:3000/posts?isFavourite=true`)
			.then(res => res.json())
			.then(json => {
				console.log("json: ", json)
				setTimeout(() => {
					dispatch(fetchFavouriteUsersSuccess(json));
				}, 3000)
			})
			.catch(error => dispatch(fetchFavouriteUsersFailure(error)));
	};
}

export const addToFavorite = (id, body) => {
	body = JSON.stringify(body);
	let myRequest = new Request(`http://localhost:3000/posts/${id}`,{
		headers: { "Content-Type": "application/json; charset=utf-8" },
		method: 'PUT',
		body: body
	  });

	 return dispatch => {

	return fetch(myRequest)
		.then(res => {
			 return res.json()})
		.then(json => {
			if(json.isFavourite){
				//add new data to favUsers
				dispatch(addFavouriteUsersSuccess(json));
			}
			else{
				dispatch(PUTFavouriteUsersSuccess(json));
			}
			
			dispatch(PUTUsersSuccess(json));
			return true;	
		})
		.catch(error => false);
	 };
}

export function addToFavorite1(user) {
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
	payload: { users, hasMore, userId }
});

export const fetchUsersFailure = error => ({
	type: FETCH_USERS_FAILURE,
	payload: { error }
})

export const fetchFavouriteUsersBegin = () => ({
	type: FETCH_FAVOURITE_USERS_BEGIN
});

export const fetchFavouriteUsersSuccess = (favUsers) => ({
	type: FETCH_FAVOURITE_USERS_SUCCESS,
	payload: { favUsers }
});




export const fetchFavouriteUsersFailure = error => ({
	type: FETCH_FAVOURITE_USERS_FAILURE,
	payload: { error }
})
export const PUTFavouriteUsersSuccess = (user) => ({
	type: PUT_FAVOURITE_USERS_SUCCESS,
	payload: { user }
});
export const addFavouriteUsersSuccess = (user) => ({
	type: ADD_FAVOURITE_USERS_SUCCESS,
	payload: { user }
});

export const PUTFavouriteUsersFailure = error => ({
	type: FETCH_FAVOURITE_USERS_FAILURE,
	payload: { error }
})

export const PUTUsersSuccess = (user) => ({
	type: PUT_USERS_SUCCESS,
	payload: { user }
});