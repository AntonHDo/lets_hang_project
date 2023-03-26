import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchCurrentUserSchedulings } from "../../store/schedulings";

const CurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  const currentSchedules = useSelector(state => state.schedulings.currentUserSchedulings
  )

  console.log("curent schedule", currentSchedules)

  useEffect(() => {
    dispatch(fetchCurrentUserSchedulings(currentUser?.id))
  }, [dispatch])

  const scheduleArr = Object.values(currentSchedules)

  console.log("curent schedule", scheduleArr)

  return (
    <div className="currentUsersScheduleContainer">
      <div className="profileContainer">
        <div className="profileNameAndPicContainer">
          <h2>My Profile</h2>
          <div className="profileImageAndFirstNameAndFriends">
            <img alt="something" />
            {/* <div className="profileNameAndFriends"> */}
            <div>{currentUser.first_name} {currentUser.last_name}</div>

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentUser
