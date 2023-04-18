import { useModal } from "../../context/Modal";
import React from "react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFriend } from "../../store/friends";
import { makeNotification } from "../../store/notifications";

const FriendsButton = ({ user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const currentUser = useSelector((state) => state.session.user)
  const [status, setStatus] = useState("pending")


  const handleFriendSubmit = async (e) => {
    e.preventDefault();
    const newFriend = {
      user_id: currentUser.id,
      friend_id: user.id,
      status: status
    }

    const friend = await dispatch(makeFriend(newFriend))
    if (friend) {
      const notification = {
        user_id: user.id,
        other_user_id: currentUser.id,
        type: "friend-request",
        message: `${currentUser.username} sent you a friend request.`
      }
      await dispatch(makeNotification(notification))
    }
    closeModal();
  }

  return (
    <button onClick={handleFriendSubmit} type="submit">Add Friend</button>
  )
}

export default FriendsButton
