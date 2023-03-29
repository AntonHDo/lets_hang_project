import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";
import { fetchSingleLocation } from "../../store/locations";
import OpenModalButton from "../OpenModalButton";
import SchedulingsModal from "../SchedulingsModal";
import { clearState } from "../../store/locations";
import "./ClimberList.css"

const ClimbersList = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams()
  const location = useSelector(state => state.locations.location)
  const currentUser = useSelector((state) => state.session.user)
  const locationUser = useSelector(state => state.locations.location?.users)
  const userSchedule = useSelector(state => state.locations.location?.schedulings)

  useEffect(() => {
    dispatch(fetchSingleLocation(locationId))
    return () => dispatch(clearState())
  }, [dispatch, locationId])

  if (!currentUser) {
    return <Redirect to='/' />
  }

  if (!location) {
    return <div>Loading...</div>
  }



  return (
    <div className="climbersListWholeContainer">
      <div className="climbersListImageContainer">
        <img src={location.preview_img} />
        <div className="climbersListGymName">{location.location_name}</div>
      </div>
      <div className="climbersListProfileContainer">
        <h2>Members</h2>
        {locationUser.map(user => (
          user.id !== currentUser.id ? (

            <OpenModalButton key={user.id} buttonText={<div className="climbersListProfilePictureContainer" >
              <img src={user.profile_picture} />
              <div className="climbersListNameAndAboutMeContaineer">
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.about_me}</div>
              </div>
            </div>}
              modalComponent={<SchedulingsModal user={user} />} />) : (
            <div key={user.id} className="climbersListProfilePictureContainer">
              <img src={user.profile_picture} />
              <div className="climbersListNameAndAboutMeContaineer">
                <div>
                  {user.first_name} {user.last_name}
                </div>
                <div>{user.about_me}</div>
              </div>
            </div>
          )
          // <div className="climbersListProfilePictureContainer" >
          //     <img src={user.profile_picture} />
          //     <div className="climbersListNameAndAboutMeContaineer">
          //       <div>{user.first_name} {user.last_name}</div>
          //       <div>{user.about_me}</div>
          //     </div>
          //   </div>

        ))}
      </div>
    </div>
  )
}

export default ClimbersList
