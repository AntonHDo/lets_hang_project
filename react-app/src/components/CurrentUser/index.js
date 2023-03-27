import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchCurrentUserSchedulings } from "../../store/schedulings";
import "./CurrentUser.css"
import OpenModalButton from "../OpenModalButton";
import EditSchedulingModal from "./EditSchedulingModal";
import DeleteSchedulingModal from "./DeleteSchedulingModal";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  const currentSchedules = useSelector(state => state.schedulings.currentUserSchedulings
  )
  const [refresh, setRefresh] = useState(false)

  useEffect(async () => {
    await dispatch(fetchCurrentUserSchedulings(currentUser?.id))
  }, [dispatch, currentUser?.id, currentUser, refresh])


  if (!currentSchedules) {
    return <div>loading...</div>
  }

  const scheduleArr = Object.values(currentSchedules)


  if (!currentUser) {
    return null
  }

  return (
    <div className="currentUsersScheduleContainer">
      <div className="profileContainer">
        <div className="profileNameAndPicContainer">
          <div className="profileAndEdit">
            <div>My Profile</div>
            <button>Edit Profile</button>
          </div>
          <div className="profileImageAndFirstNameAndFriends">
            <img alt="something" />
            <div>{currentUser?.first_name} {currentUser?.last_name}</div>
          </div>
        </div>
      </div>
      <div className="profileBiosContainer">
        <div>{currentUser.about_me}</div>
        <div className="otherUsersScheduleContainer">
          My Schedulings
          {scheduleArr.map(schedule => (
            <div className="otherUserProfilePictureAndDetails" key={schedule.id}>
              <img src={schedule.friend.profile_picture
              } />
              <div className="friendNameAndSchedule">
                <div>{schedule.friend.first_name} {schedule.friend.last_name}</div>
                <div>
                  {new Date(schedule.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, {new Date(`January 1, 1970 ${schedule.time_start}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} to {new Date(`January 1, 1970 ${schedule.time_end}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                </div>
                <div>
                  Status: {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1).toLowerCase()}
                  <div className="schedulingDeleteAndEditButtonContainer">
                    <div className="schedulingDeleteButton"> <OpenModalButton
                      buttonText="Delete"
                      modalComponent={
                        <DeleteSchedulingModal scheduleId={schedule.id} onDeleted={setRefresh} />
                      } /></div>
                    <div className="schedulingEditButton"><OpenModalButton
                      buttonText="Edit"
                      modalComponent={
                        <EditSchedulingModal schedule={schedule} onDeleted={setRefresh} />
                      } /></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrentUser
