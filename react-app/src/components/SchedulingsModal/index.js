import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { makeScheduling } from "../../store/schedulings";
import { makeNotification } from "../../store/notifications";


const SchedulingsModal = ({ user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const [showForm, setShowForm] = useState(false)
  const currentUser = useSelector((state) => state.session.user)
  const [date, setDate] = useState("")
  const [timeStart, setTimeStart] = useState("")
  const [timeEnd, setTimeEnd] = useState("")
  const handleScheduleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newScheduling = {
      date: date,
      time_start: timeStart,
      time_end: timeEnd,
      user_id: currentUser.id,
      friend_id: user.id,
      location_id: user.location_id,
      status: "pending"
    };

    const scheduling = await dispatch(makeScheduling(newScheduling))


    const notification = {
      user_id: user.id, // The user who will receive the notification
      other_user_id: currentUser.id, // The user who is sending the notification
      scheduling_id: scheduling?.id, // The scheduling ID associated with the notification
      type: "scheduling_request", // Set a default value for the 'type' field
      message: "hi",
      read: false,
    };
    await dispatch(makeNotification(notification, scheduling));

    closeModal()
  }

  const handleCancel = () => {
    setShowForm(false)
  }
  // console.log("user from modal", user)

  return (
    <div className="schedulingModalContainer">
      <div className="schedulingModalProfilePicture">
        <img src={user.profile_picture} />
        <div className="schedulingModalNameAndAbout">
          <div>{user.first_name} {user.last_name}</div>
          <div>{user.about_me}</div>
        </div>
      </div>
      <div className="schedulingModalButtonsContainer">
        {!showForm && (
          <button onClick={handleScheduleClick} disabled={showForm}>Schedule a hangout
          </button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="schedulingModalDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="timeStart">Start Time:</label>
            <input
              type="time"
              className="schedulingModalTimeStart"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
            />
            <label htmlFor="timeEnd">End Time:</label>
            <input
              type="time"
              className="schedulingModalTimeEnd"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
            />
            <button type="submit">Lets Hang!</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        )}
        <button>Add Friend</button>
      </div>
    </div>
  )
}

export default SchedulingsModal
