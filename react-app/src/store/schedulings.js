export const GET_ALL_SCHEDULINGS = "schedulings/all";

export const GET_SINGLE_SCHEDULING = "scheduling";

export const GET_CURRENT_USER_SCHEDULINGS = "schedulings/current";

export const CREATE_SCHEDULING = "scheduling/create";

export const EDIT_SCHEDULING = "scheduling/edit";

export const DELETE_SCHEDULING = "scheduling/delete"

export const UPDATE_SCHEDULING_STATUS = "scheduling/updateStatus"

export const getSchedulings = (schedulings) => {
  return {
    type: GET_ALL_SCHEDULINGS,
    schedulings
  }
}

export const getSingleScheduling = (scheduling) => {
  return {
    type: GET_SINGLE_SCHEDULING,
    scheduling
  }
}

export const getCurrentUserSchedulings = (currentUserScheduling) => {
  return {
    type: GET_CURRENT_USER_SCHEDULINGS,
    currentUserScheduling
  }
}

export const createScheduling = (scheduling) => {
  return {
    type: CREATE_SCHEDULING,
    scheduling
  }
}

export const editScheduling = (scheduling) => {
  return {
    type: EDIT_SCHEDULING,
    scheduling
  }
}

export const deleteScheduling = (schedulingId) => {
  return {
    type: DELETE_SCHEDULING,
    schedulingId
  }
}

export const updateSchedulingStatus = (schedulingId, status) => {
  return {
    type: UPDATE_SCHEDULING_STATUS,
    status
  }
}

//thunk
export const fetchSchedulings = () => async (dispatch) => {
  const response = await fetch("/api/schedulings/");

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach((scheduling) => (normalizedData[scheduling.id] = scheduling));
    dispatch(getSchedulings(normalizedData))
  }
}


export const fetchSingleScheduling = (schedulingId) => async (dispatch) => {
  const response = await fetch(`/api/schedulings/${schedulingId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleScheduling(data))
  }
}


export const fetchCurrentUserSchedulings = (userId) => async (dispatch) => {
  const response = await fetch("/api/schedulings/");

  if (response.ok) {
    let data = await response.json();
    let normalizedData = {};
    data = data.filter(scheduling => {
      return scheduling.user_id === userId
    })
    data.forEach((scheduling) => (normalizedData[scheduling.id] = scheduling));
    dispatch(getCurrentUserSchedulings(normalizedData));
  }
}


export const makeScheduling = (newScheduling) => async (dispatch) => {
  const response = await fetch(`/api/schedulings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newScheduling),
  });

  if (response.ok) {
    const details = await response.json();
    dispatch(createScheduling(details));
    return details;
  }
};


export const updateScheduling = (scheduling) => async (dispatch) => {
  const response = await fetch(`/api/schedulings/${scheduling.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduling),
  });
  if (response.ok) {
    const scheduling = await response.json();
    dispatch(editScheduling(scheduling));
  }
};

export const changeSchedulingStatus = (schedulingId, status) => async (dispatch) => {
  const response = fetch(`/api/schedulings/${schedulingId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  if (response.ok) {
    dispatch(updateSchedulingStatus(schedulingId, status))
  }
}

export const removeScheduling = (schedulingId) => async (dispatch) => {
  const response = await fetch(`/api/schedulings/${schedulingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("response from thunk", response)
    dispatch(deleteScheduling(schedulingId));
  }

};


const initialState = {};


//reducer

const schedulingsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SCHEDULINGS:
      newState["schedulings"] = action.schedulings;
      return newState;
    case GET_SINGLE_SCHEDULING:
      newState['scheduling'] = action.scheduling;
      return newState;
    case GET_CURRENT_USER_SCHEDULINGS:
      newState["currentUserSchedulings"] = action.currentUserScheduling;
      return newState
    case CREATE_SCHEDULING:
      newState["scheduling"] = action.scheduling;
      return newState
    case EDIT_SCHEDULING:
      newState.currentUserScheduling = { ...state.currentUserScheduling }
      newState.currentUserScheduling[action.scheduling.id] = action.scheduling
      return newState;
    case UPDATE_SCHEDULING_STATUS:
      newState.currentUserScheduling = { ...state.currentUserScheduling };
      if (newState.currentUserScheduling[action.schedulingId]) {
        newState.currentUserScheduling[action.schedulingId].status = action.status;
      }
      return newState;
    case DELETE_SCHEDULING:
      console.log("DELETE_SCHEDULING called");
      newState.currentUserScheduling = { ...state.currentUserScheduling }
      delete newState.currentUserScheduling[action.schedulingId]
      return newState
    default:
      return state
  }
}

export default schedulingsReducer
