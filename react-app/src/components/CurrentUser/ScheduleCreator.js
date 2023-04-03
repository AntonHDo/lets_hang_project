import React, { useEffect, useState } from "react"
import "./CurrentUser.css"
import OpenModalButton from "../OpenModalButton";
import EditSchedulingModal from "./EditSchedulingModal";
import DeleteSchedulingModal from "./DeleteSchedulingModal";
import EditProfileModal from "./EditProfileModal";
import DeleteUserModal from "./DeleteUserModal";

const ScheduleCreator = ({ schedule, setRefresh }) => {
  const createDateWithUTC = (dateString) => {
    const date = new Date(dateString);
    console.log("scheduling", schedule)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  }

  return (
    <>
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
    </>
  )
}

export default ScheduleCreator
