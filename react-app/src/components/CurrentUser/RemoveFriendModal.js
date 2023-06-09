
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeFriend } from "../../store/friends";


const RemoveFriendModal = ({ friends, onDeleted }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const friendsArr = Object.values(friends);


  const handleRemoveFriend = async (id) => {


    await dispatch(removeFriend(id));
    closeModal();
    onDeleted((prevState) => !prevState);
  };

  return (
    <div className="friends-modal-container">
      <div className="notificationInModal">
        Friend(s)
      </div>
      {friendsArr.map(friend => (
        <div className="friends-detail-container" key={friend.id}>
          <div className="friends-first-last-name">
            {friend.friend.first_name} {friend.friend.last_name}
          </div>

          <button type="submit" onClick={() => handleRemoveFriend(friend.friend_id)}>Delete Friend?
          </button>
        </div>
      ))}
    </div>
  )
}

export default RemoveFriendModal
