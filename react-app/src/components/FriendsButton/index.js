import { useModal } from "../../context/Modal";
import React from "react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFriend } from "../../store/friends";
import { makeNotification } from "../../store/notifications";

const FriendsButton = ({ user, sentRequests, setSentRequests }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const currentUser = useSelector((state) => state.session.user)
  const currentUserFriends = useSelector((state) => state.friends.currentUserFriends)
  const [status, setStatus] = useState("pending")
  const [requestSent, setRequestSent] = useState(false)


  const isFriendOrRequested = () => {
    if (!currentUserFriends) return false;
    const friendStatus = Object.values(currentUserFriends).find((friend) => friend.friend_id === user.id);

    const requestSentInSession = sentRequests.includes(user.id)

    return friendStatus || requestSentInSession;
  }

  const handleFriendSubmit = async (e) => {
    e.preventDefault();
    closeModal();

    setSentRequests([...sentRequests, user.id])
    const notification = {
      user_id: user.id,
      other_user_id: currentUser.id,
      type: "friend-request",
      message: `${currentUser.username} sent you a friend request.`
    }
    await dispatch(makeNotification(notification))
  }

  return (
    <button onClick={handleFriendSubmit} type="submit" disabled={isFriendOrRequested() || requestSent}>Add Friend</button>
  )
}

export default FriendsButton
