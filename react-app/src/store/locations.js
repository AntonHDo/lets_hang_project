export const GET_ALL_LOCATIONS = "locations/all"

export const GET_SINGLE_LOCATION = "location"

export const getLocations = (locations) => {
  return {
    type: GET_ALL_LOCATIONS,
    locations
  }
}

export const getSingleLocation = (location) => {
  return {
    type: GET_SINGLE_LOCATION,
    location
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

export const fetchSingleLocation = (locationId) => async (dispatch) => {
  const response = await fetch(`/api/locations/${locationId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleLocation(data))
  }
}

const initialState = {};

//reducer

const locationsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_LOCATIONS:
      newState["locations"] = action.locations;
      return newState;
    case GET_SINGLE_LOCATION:
      newState['location'] = action.location;
      return newState;
    default:
      return state
  }
}

export default locationsReducer
