import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchLocations } from "../../store/locations";

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations)
  console.log("locations from home page", locations)
  useEffect(() => {
    dispatch(fetchLocations())
  }, [dispatch])

  return (
    <div></div>
  )
}

export default Locations
