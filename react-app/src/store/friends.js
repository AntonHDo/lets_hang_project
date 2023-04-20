export const GET_ALL_FREINDS = 'friends/all'

export const GET_SINGLE_FRIEND = "friend"

export const GET_CURRENT_USER_FRIENDS = 'friends/current'

export const CREATE_FRIEND = 'friend/create'

export const DELETE_FRIEND = 'friend/delete'

export const UPDATE_FRIEND_STATUS = "friend/updateStatus"

export const getFriends = (friends) => {
  return {
    type: GET_ALL_FREINDS,
    friends
  }
}

export const getCurrentUserFriends = (currentUserFriend) => {
  return {
    type: GET_CURRENT_USER_FRIENDS,
    currentUserFriend
  }
}

export const createFriend = (friend) => {
  return {
    type: CREATE_FRIEND,
    friend
  }
}

export const updateFriendStatus = (friendId, status) => {
  return {
    type: UPDATE_FRIEND_STATUS,
    friendId,
    status
  }
}

export const deleteFriend = (friendId) => {
  return {
    type: DELETE_FRIEND,
    friendId
  }
}

export const changeFriendStatus = (friendId, status) => async (dispatch) => {
  const response = await fetch(`/api/friends/${friendId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  if (response.ok) {
    dispatch(updateFriendStatus(friendId, status))
  }
}

//thunk
export const fetchFriends = () => async (dispatch) => {
  const response = await fetch("/api/friends/");

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach((friend) => (normalizedData[friend.id] = friend));
    dispatch(getFriends(normalizedData))
  }
}

export const fetchCurrentUserFriends = (userId) => async (dispatch) => {
  const response = await fetch("/api/friends/");

  if (response.ok) {
    let data = await response.json();
    let normalizedData = {};
    data = data.filter(friend => {
      return friend.user_id === userId
    })
    data.forEach((friend) => (normalizedData[friend.id] = friend));
    dispatch(getCurrentUserFriends(normalizedData))
  }
}

export const makeFriend = (newFriend) => async (dispatch) => {
  const response = await fetch(`/api/friends/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFriend),
  })

  if (response.ok) {
    const details = await response.json();
    dispatch(createFriend(details))
    return details;
  }
}

export const removeFriend = (friendId) => async (dispatch) => {
  const response = await fetch(`/api/friends/${friendId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteFriend(friendId));
  }
}

//reducer

const initialState = {};

const friendsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_FREINDS:
      newState["friends"] = action.friends;
      return newState
    case GET_CURRENT_USER_FRIENDS:
      newState['currentUserFriends'] = action.currentUserFriend;
      return newState
    case CREATE_FRIEND:
      newState['friend'] = action.friend;
      return newState
    case UPDATE_FRIEND_STATUS:
      newState.currentUserFriend = { ...state.currentUserFriend };
      if (newState.currentUserFriend[action.friendId]) {
        newState.currentUserFriend[action.friendId].status = action.status;
      }
      return newState;

    case DELETE_FRIEND:
      newState.currentUserFriend = { ...state.currentUserFriend }
      delete newState.currentUserFriend[action.friendId]
      return newState
    default:
      return state
  }
}

export default friendsReducer
