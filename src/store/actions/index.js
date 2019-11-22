import Constant from '../../constants/action.constant';

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
	let myRequest = new Request(`http://localhost:3000/posts/${id}`, {
		headers: { "Content-Type": "application/json; charset=utf-8" },
		method: 'PUT',
		body: body
	});

	return dispatch => {
		return fetch(myRequest)
			.then(res => {
				return res.json()
			})
			.then(json => {
				if (json.isFavourite) {
					//add new data to favUsers
					dispatch(addFavouriteUsersSuccess(json));
				}
				else {
					dispatch(PUTFavouriteUsersSuccess(json));
				}

				dispatch(PUTUsersSuccess(json));
				return true;
			})
			.catch(error => false);
	};
}

export const fetchUsersBegin = () => ({
	type: Constant.FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users, hasMore, userId) => ({
	type: Constant.FETCH_USERS_SUCCESS,
	payload: { users, hasMore, userId }
});

export const fetchUsersFailure = error => ({
	type: Constant.FETCH_USERS_FAILURE,
	payload: { error }
})

export const fetchFavouriteUsersBegin = () => ({
	type: Constant.FETCH_FAVOURITE_USERS_BEGIN
});

export const fetchFavouriteUsersSuccess = (favUsers) => ({
	type: Constant.FETCH_FAVOURITE_USERS_SUCCESS,
	payload: { favUsers }
});




export const fetchFavouriteUsersFailure = error => ({
	type: Constant.FETCH_FAVOURITE_USERS_FAILURE,
	payload: { error }
})
export const PUTFavouriteUsersSuccess = (user) => ({
	type: Constant.PUT_FAVOURITE_USERS_SUCCESS,
	payload: { user }
});
export const addFavouriteUsersSuccess = (user) => ({
	type: Constant.ADD_FAVOURITE_USERS_SUCCESS,
	payload: { user }
});

export const PUTFavouriteUsersFailure = error => ({
	type: Constant.FETCH_FAVOURITE_USERS_FAILURE,
	payload: { error }
})

export const PUTUsersSuccess = (user) => ({
	type: Constant.PUT_USERS_SUCCESS,
	payload: { user }
});