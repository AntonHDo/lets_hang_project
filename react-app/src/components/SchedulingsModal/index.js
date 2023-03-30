import React from "react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { makeScheduling } from "../../store/schedulings";
import { makeNotification } from "../../store/notifications";
import { fetchSchedulings } from "../../store/schedulings";

const SchedulingsModal = ({ user }) => {
  const dispatch = useDispatch();
  const allSchedulings = useSelector(state => state.schedulings.schedulings)
  const { closeModal } = useModal()
  const [showForm, setShowForm] = useState(false)
  const currentUser = useSelector((state) => state.session.user)
  const [date, setDate] = useState("")
  const [timeStart, setTimeStart] = useState("")
  const [timeEnd, setTimeEnd] = useState("")
  const [status, setStatus] = useState("pending")

  const [errors, setErrors] = useState({
    date: "",
    timeStart: "",
    timeEnd: ""
  })


  const isFormValid = date && timeStart && timeEnd;

  useEffect(() => {
    dispatch(fetchSchedulings())
  }, [dispatch])


  const handleScheduleClick = () => {
    setShowForm(true);
  };


  const validateScheduling = (newScheduling) => {
    const errors = {
      date: "",
      timeStart: "",
      timeEnd: "",
    };
    const schedulingsArr = Object.values(allSchedulings)
    const now = new Date();
    const schedulingDate = new Date(newScheduling.date);
    const startTime = new Date(`${newScheduling.date} ${newScheduling.time_start}`)
    const endTime = new Date(`${newScheduling.date} ${newScheduling.time_end}`)

    if (schedulingDate < now) {
      errors.date = "Cannot schedule a hangout in the past";
    }

    if (startTime.getHours() < 6) {
      errors.timeStart = "Cannot schedule a start time before 6 AM";
    }

    if (endTime.getHours() >= 23) {
      errors.timeEnd = ("Cannot schedule an end time after 11 PM");
    }
    if (endTime <= startTime) {
      errors.timeEnd = ("End time must be after the start time");
    }


    const conflictingSchedulings = schedulingsArr.filter((scheduling) => {
      const existingStartTime = new Date(`${scheduling.date} ${scheduling.time_start}`);
      const existingEndTime = new Date(`${scheduling.date} ${scheduling.time_end}`);
      const userIds = [currentUser.id, user.id];

      return (
        userIds.includes(scheduling.user_id) &&
        userIds.includes(scheduling.friend_id) &&
        schedulingDate.toDateString() === new Date(scheduling.date).toDateString() &&
        (
          (startTime >= existingStartTime && startTime < existingEndTime) ||
          (endTime > existingStartTime && endTime <= existingEndTime) ||
          (startTime <= existingStartTime && endTime >= existingEndTime)
        )
      );
    });
    if (conflictingSchedulings.length > 0) {
      errors.conflict = "Cannot schedule a hangout that conflicts with an existing scheduling"
    }
    return errors;
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    const newScheduling = {
      date: date,
      time_start: timeStart,
      time_end: timeEnd,
      user_id: currentUser.id,
      friend_id: user.id,
      location_id: user.location_id,
      status: status
    };

    const validationErrors = validateScheduling(newScheduling)
    setErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some((error) => error !== "");

    if (hasErrors) {
      console.log(errors)
      return
    }
    //.some is an array method, test to see if at least one element in aray passes test and returns boolean.

    // const errors = validateScheduling(newScheduling);
    // if (errors.length > 0) {
    //   return
    // }

    const scheduling = await dispatch(makeScheduling(newScheduling))


    const notification = {
      user_id: user.id,
      other_user_id: currentUser.id,
      scheduling_id: scheduling?.id,
      type: "scheduling_request",
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
            {Object.values(errors).map((value, index) => {
              if (value) {
                return (
                  <div key={index} className="error-message">
                    {value}
                  </div>
                );
              }
              return null;
            })}
            {/* {errors.date && <div className="error-message">{errors.date}</div>}
            {errors.conflict && <div className="error-message">{errors.conflict}</div>} */}
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="schedulingModalDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {/* {errors.timeStart && <div className="error-message">{errors.timeStart}</div>} */}
            <label htmlFor="timeStart">Start Time:</label>
            <input
              type="time"
              className="schedulingModalTimeStart"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
            />
            {/* {errors.timeEnd && <div className="error-message">{errors.timeEnd}</div>} */}
            <label htmlFor="timeEnd">End Time:</label>
            <input
              type="time"
              className="schedulingModalTimeEnd"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
            />
            <button type="submit" disabled={!isFormValid}>Lets Hang!</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        )}
        <button onClick={() => window.alert("Feature not yet implimented")}>Add Friend</button>
      </div>
    </div>
  )
}

export default SchedulingsModal
