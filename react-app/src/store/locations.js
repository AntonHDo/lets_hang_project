export const GET_ALL_LOCATIONS = "locations/all"

export const getLocations = (locations) => {
  return {
    type: GET_ALL_LOCATIONS,
    locations
  }
}

//thunk
export const fetchLocations = () => async (dispatch) => {
  const response = await fetch("/api/locations/");

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach((location) => (normalizedData[location.id] = location));
    dispatch(getLocations(normalizedData))
  }
}


const initialState = {};

//reducer

const locationsReducer = (state = initialState, action) => {
  let newState = { ...state };
  // console.log("new state from reducer", newState)
  // console.log("action from reducer", action)
  switch (action.type) {
    case GET_ALL_LOCATIONS:
      newState["locations"] = action.locations;
      return newState;
    default:
      return state
  }
}

export default locationsReducer
