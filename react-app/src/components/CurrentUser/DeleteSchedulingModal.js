import { useModal } from "../../context/Modal";
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { removeScheduling } from "../../store/schedulings";

const DeleteSchedulingModal = ({ scheduleId, onDeleted }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  console.log("schedule id", scheduleId)


  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(removeScheduling(scheduleId))
    closeModal()
    onDeleted((prev) => !prev)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this scheduling?</p>
        <button className="yes-please-delete" type="submit" onClick={handleSubmit}>Yes (Delete Scheduling)</button>
        <button className="no-do-not-delete" type="button" onClick={closeModal}>No (Keep Scheduling)</button>
      </form>
    </div>
  )
}

export default DeleteSchedulingModal
