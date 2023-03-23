export const GET_ALL_SCHEDULINGS = "schedulings/all"

export const getSchedulings = (schedulings) => {
  return {
    type: GET_ALL_SCHEDULINGS,
    schedulings
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


const initialState = {};

//reducer

const schedulingsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SCHEDULINGS:
      newState["schedulings"] = action.schedulings;
      return newState;
    default:
      return state
  }
}

export default schedulingsReducer
