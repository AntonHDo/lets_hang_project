import { useModal } from "../../context/Modal";
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { extinguishUser } from "../../store/session";


const DeleteUserModal = ({ currentUserId }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentUserId === 1 || currentUserId === 2) {
      alert("Demo accounts cannot be deleted.");
      return;
    }

    await dispatch(extinguishUser(currentUserId))
    closeModal()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this account?</p>
        <button className="yes-please-delete" type="submit" onClick={handleSubmit}>Yes (Delete account)</button>
        <button className="no-do-not-delete" type="button" onClick={closeModal}>Nope (Lets Keep Climbing!)</button>
      </form>
    </div>
  )
}

export default DeleteUserModal
