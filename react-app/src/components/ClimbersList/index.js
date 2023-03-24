import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";
import { fetchSingleLocation } from "../../store/locations";

const ClimbersList = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams()
  const location = useSelector(state => state.locations.location)
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(fetchSingleLocation(locationId))
  }, [dispatch])

  if (!user) {
    return <Redirect to='/' />
  }

  if (!location) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <img src={location.preview_img} />
    </div>
  )
}

export default ClimbersList
