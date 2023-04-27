import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchCurrentUserSchedulings } from "../../store/schedulings";
import "./CurrentUser.css"
import OpenModalButton from "../OpenModalButton";
import EditSchedulingModal from "./EditSchedulingModal";
import DeleteSchedulingModal from "./DeleteSchedulingModal";
import EditProfileModal from "./EditProfileModal";
import DeleteUserModal from "./DeleteUserModal";
import { fetchCurrentUserFriends } from "../../store/friends";
import RemoveFriendModal from "./RemoveFriendModal";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const currentSchedules = useSelector(state => state.schedulings.currentUserSchedulings)
  const currentUserFriends = useSelector(state => state.friends.currentUserFriends)


  const [refresh, setRefresh] = useState(false)

  const createDateWithUTC = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  }



  useEffect(() => {
    dispatch(fetchCurrentUserSchedulings(currentUser?.id))
    dispatch(fetchCurrentUserFriends(currentUser?.id))
  }, [dispatch, currentUser?.id, currentUser, refresh])

  if (!currentUser) {
    return <Redirect to='/' />
  }

  if (!currentSchedules) {
    return <div>loading...</div>
  }

  if (!currentUserFriends) {
    return null
  }
  const scheduleArr = Object.values(currentSchedules)
  // console.log(currentUser)

  const userFriendsArr = Object.values(currentUserFriends)


  if (!currentUser) {
    return null
  }

  return (
    <div className="currentUsersScheduleContainer">
      <div className="profileContainer">
        <div className="profileNameAndPicContainer">
          <div className="profileAndEdit">
            <div className="profileText">My Profile</div>
            <div className="deleteAndEditProfileButtons">
              <div className="userAccountDeleteButton"> <OpenModalButton
                buttonText="Delete Account"
                modalComponent={
                  <DeleteUserModal currentUserId={currentUser.id} onDeleted={setRefresh} />
                } /></div>
              <div className="editProfileButton"> <OpenModalButton
                buttonText="Edit Profile"
                modalComponent={
                  <EditProfileModal currentUser={currentUser} onDeleted={setRefresh} />
                } /></div>
            </div>
          </div>
          <div className="profileImageAndFirstNameAndFriends">
            <div className="profileImageContainer">
              <img src={currentUser?.profile_picture} alt="something" />
            </div>
            <div className="currentUsersFullNameText">
              <div>
                {currentUser?.first_name} {currentUser?.last_name}
              </div>
              <div className="currentUsersFriendsButton">
                <OpenModalButton
                  buttonText={`${userFriendsArr.length} Friend(s)`}
                  modalComponent={<RemoveFriendModal friends={currentUserFriends}
                    onDeleted={setRefresh} />}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="currentUsersDetailsContainer">
        <div className="currentUsersAboutMeContainer">
          <div className="currentUsersBioText">Bio:</div>
          <div className="borderForAboutMe">
            <div className="currentUsersDetails">
              {currentUser.about_me}
            </div>
          </div>

        </div>
        <div className="profileBiosContainer">

        </div>
        <div className="otherUsersScheduleContainer">
          <div className="mySchedulings">
            My Schedulings
          </div>
          {scheduleArr.map(schedule => (
            <div className="otherUserProfilePictureAndDetails" key={schedule.id}>
              <div className="otherUsersimageContainer">
                <img src={schedule.friend.profile_picture
                } />
              </div>
              <div className="friendNameAndSchedule">
                <div className="friendsDetails">{schedule.friend.first_name} {schedule.friend.last_name}</div>
                <div className="friendsDetails">
                  {createDateWithUTC(schedule.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, {new Date(`January 1, 1970 ${schedule.time_start}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} to {new Date(`January 1, 1970 ${schedule.time_end}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                </div>
                <div className="friendsDetails">
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
