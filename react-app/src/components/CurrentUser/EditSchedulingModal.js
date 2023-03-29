import { useModal } from "../../context/Modal";
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { updateScheduling } from "../../store/schedulings";
import { fetchSchedulings } from "../../store/schedulings";



const EditSchedulingModal = ({ schedule, onDeleted }) => {
  const dispatch = useDispatch();
  const allSchedulings = useSelector(state => state.schedulings.schedulings)
  const { closeModal } = useModal()
  const [date, setDate] = useState(schedule.date)
  const currentUser = useSelector((state) => state.session.user)
  const [timeStart, setTimeStart] = useState(schedule.time_start)
  const [timeEnd, setTimeEnd] = useState(schedule.time_end)
  const [status, setStatus] = useState("accepted")

  const [errors, setErrors] = useState({
    date: "",
    timeStart: "",
    timeEnd: ""
  })


  const isFormValid = date && timeStart && timeEnd;

  useEffect(() => {
    dispatch(fetchSchedulings())
  }, [dispatch])

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
      const userIds = [currentUser.id, scheduling.friend_id];

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
      "date": date,
      "time_start": timeStart,
      "time_end": timeEnd,
      'user_id': currentUser.id,
      'friend_id': schedule.friend_id,
      'location_id': schedule.location_id,
      "id": schedule.id,
      "status": status
    };

    const validationErrors = validateScheduling(newScheduling)
    setErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some((error) => error !== "");

    if (hasErrors) {
      console.log(errors)
      return
    }

    await dispatch(updateScheduling(newScheduling))
    closeModal()
    onDeleted((prev) => !prev)
  }

  return (
    <div className="editSchedulingContainer">
      <h2>Edit Hang Out Times</h2>
      <form className="editSchedulingForm" onSubmit={handleSubmit}>
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
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          className="EditSchedulingModalDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="timeStart">Start Time:</label>
        <input
          type="time"
          className="EditSchedulingModalTimeStart"
          value={timeStart}
          onChange={(e) => setTimeStart(e.target.value)}
        />
        <label htmlFor="timeEnd">End Time:</label>
        <input
          type="time"
          className="editSchedulingModalTimeEnd"
          value={timeEnd}
          onChange={(e) => setTimeEnd(e.target.value)}
        />
        <button disabled={!isFormValid} type="submit">Update Hangout!</button>
        <button type="button" onClick={() => closeModal()}>Cancel</button>
      </form>
    </div>
  )
}

export default EditSchedulingModal
