export const GET_ALL_NOTIFICATIONS = "notifications/all"

export const GET_SINGLE_NOTIFICATION = "notification"

export const CREATE_NOTIFICATION = "notification/create"

export const DELETE_NOTIFICATION = "notification/delete"

export const getNotifications = (notifications) => {
  return {
    type: GET_ALL_NOTIFICATIONS,
    notifications
  }
}

export const getSingleNotification = (notification) => {
  return {
    type: GET_SINGLE_NOTIFICATION,
    notification
  }
}

export const createNotification = (notification) => {
  return {
    type: CREATE_NOTIFICATION,
    notification
  }
}

export const deleteNotification = (notificationId) => {
  return {
    type: DELETE_NOTIFICATION,
    notificationId
  }
}

//thunk

export const fetchNotifications = () => async (dispatch, getState) => {
  const response = await fetch("/api/notifications/");

  if (response.ok) {
    const data = await response.json();
    const userId = getState().session?.user?.id;
    const filteredData = data.filter(notification => notification.user_id === userId)

    let normalizedData = {};
    filteredData.forEach((notification) => (normalizedData[notification.id] = notification));
    dispatch(getNotifications(normalizedData))
  }
}

export const fetchSingleNotification = (notificationId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${notificationId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleNotification(data))
  }
}

// export const makeNotification = (newNotification) => async (dispatch) => {
//   const response = await fetch(`/api/notifications/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newNotification),
//   });

//   if (response.ok) {
//     const details = await response.json();
//     dispatch(createNotification(details));
//     return details;
//   }
// };
export const makeNotification = (notification, scheduling) => async (dispatch) => {
  if (scheduling) {
    notification.scheduling_id = scheduling.id;
  }
  const res = await fetch('/api/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notification)
  });
  if (res.ok) {
    const newNotification = await res.json();
    dispatch(createNotification(newNotification));
    return newNotification;
  }
};

export const removeNotification = (notificationId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${notificationId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteNotification(notificationId));
  }
};




//reducer
const initialState = {};

const notificationsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      newState["notifications"] = action.notifications;
      return newState
    case CREATE_NOTIFICATION:
      newState["notification"] = action.notification;
      return newState
    case DELETE_NOTIFICATION:
      delete newState.notifications[action.notificationId];
      return newState;
    default:
      return state
  }
}
export default notificationsReducer
