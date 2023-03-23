import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";
import { fetchSingleLocation } from "../../store/locations";

const ClimbersList = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams()
  const location = useSelector(state => state.location)

  console.log("single location:", location)

  useEffect(() => {
    dispatch(fetchSingleLocation(locationId))
  }, [dispatch])

  return (
    <div>Sup</div>
  )
}

export default ClimbersList
