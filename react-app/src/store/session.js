// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_ADDITIONAL_USER_INFO = "session/SET_ADDITIONAL_USER_INFO";
const EDIT_USER = "session/EDIT_USER";
const DELETE_USER = "session/DELETE_USER"


const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});
const setAdditionalUserInfo = (additionalInfo) => ({
	type: SET_ADDITIONAL_USER_INFO,
	payload: additionalInfo,
});
const removeUser = () => ({
	type: REMOVE_USER,
});

const editUser = (user) => ({
	type: EDIT_USER,
	payload: user,
})

const deleteUser = (userId) => ({
	type: DELETE_USER,
	payload: userId
})

const initialState = { user: null };

export const extinguishUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		method: "DELETE"
	});
	if (response.ok) {
		dispatch(deleteUser(userId))
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const editUserInfo = (id, userInfo) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userInfo)
	})

	if (response.ok) {
		const user = await response.json()
		dispatch(editUser(user))
	}
}

export const signUp = (newUser) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: newUser,
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const saveStepOneData = (username, email, password, firstName, lastName, dateOfBirth) => async (dispatch) => {
	const stepOneData = {
		username,
		email,
		password,
		firstName,
		lastName,
		dateOfBirth,
	};

	dispatch(setAdditionalUserInfo({ ...stepOneData }));
};

export const saveStepTwoData = (location, gender, bio, profilePicture) => async (dispatch) => {
	const stepTwoData = {
		location,
		gender,
		bio,
		profilePicture,
	};

	dispatch(setAdditionalUserInfo({ ...stepTwoData }));
};


export const checkExistingUsernameEmail = (username, email) => async (dispatch) => {
	const response = await fetch('/api/users/check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			email,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return {
			usernameExists: false,
			emailExists: false,
		};
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case SET_ADDITIONAL_USER_INFO:
			return { ...state, additionalInfo: action.payload };
		case REMOVE_USER:
			return { user: null };
		case EDIT_USER:
			return { ...state, user: action.payload };
		case DELETE_USER:
			return { user: null }
		default:
			return state;
	}
}
