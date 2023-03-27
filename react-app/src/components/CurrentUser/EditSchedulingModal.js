import { useModal } from "../../context/Modal";
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { updateScheduling } from "../../store/schedulings";

const EditSchedulingModal = ({ schedule, onDeleted }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const [date, setDate] = useState(schedule.date)
  const currentUser = useSelector((state) => state.session.user)
  const [timeStart, setTimeStart] = useState(schedule.time_start)
  const [timeEnd, setTimeEnd] = useState(schedule.time_end)
  const [status, setStatus] = useState("accepted")
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
    console.log('new scheduling', newScheduling)
    await dispatch(updateScheduling(newScheduling))
    closeModal()
    onDeleted((prev) => !prev)
  }

  return (
    <div className="editSchedulingContainer">
      <h2>Edit Hang Out Times</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update Hangout!</button>
        <button type="button" onClick={() => closeModal()}>Cancel</button>
      </form>
    </div>
  )
}

export default EditSchedulingModal
