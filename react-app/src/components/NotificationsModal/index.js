import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeNotification } from "../../store/notifications";
import { removeScheduling } from "../../store/schedulings";
import { removeFriend } from "../../store/friends";
import { fetchNotifications, setNotificationsCount } from "../../store/notifications";
import { updateScheduling } from "../../store/schedulings";
import { refreshFriends, makeFriend } from "../../store/friends";
import './NotificationsModal.css'



const NotificationsModal = ({ notifications, locations, refresh }) => {
  const dispatch = useDispatch()
  // const notificationsArr = Object.values(notifications)
  const locationsArr = Object.values(locations)
  const currentUser = useSelector((state) => state.session.user)
  const updatedNotifications = useSelector((state) => state.notifications);
  const [status, setStatus] = useState()
  const { closeModal } = useModal();


  const notificationsArr = Object.values(notifications).filter(notification => {
    if (notification.type === 'scheduling_request') {
      return locationsArr.some(location => location.id === notification.scheduling?.location_id);
    }
    return true;
  });


  const handleFriendRequest = async (notificationId) => {
    const notification = notificationsArr.find((notif) => notif.id === notificationId);
    const newFriend = {
      user_id: currentUser?.id,
      friend_id: notification.other_user.id,
      status: "accepted"
    }

    const newFriendReverse = {
      user_id: notification.other_user.id,
      friend_id: currentUser?.id,
      status: "accepted"
    };

    await dispatch(makeFriend(newFriend))
    await dispatch(makeFriend(newFriendReverse));
    await dispatch(removeNotification(notificationId));
    dispatch(fetchNotifications());

    dispatch(refreshFriends());

    closeModal()
  }

  const handleAccept = async (scheduling, notificationId) => {
    await dispatch(removeNotification(notificationId));
    const newScheduling = {
      ...scheduling,
      status: 'accepted'
    }

    dispatch(updateScheduling(newScheduling))
    dispatch(fetchNotifications())
    dispatch(refreshFriends());
    closeModal()
  }

  const handleDecline = async (notification) => {
    const { id, type, other_user, scheduling } = notification;
    await dispatch(removeNotification(id));

    if (notification.type === 'friend-request') {
      //fix line 51 later, wrong id
      await dispatch(removeFriend(other_user.id))
    } else if (notification.type === "scheduling_request" && scheduling) {
      await dispatch(removeScheduling(scheduling.id))
    }
    dispatch(fetchNotifications())

    if (Object.keys(updatedNotifications).length === 0) {
      dispatch(setNotificationsCount(0));
    }
    dispatch(refreshFriends());
    closeModal()
  }

  if (!notifications) {
    return null
  }

  return (
    <ul className="nofitications-container no-padding">
      <div className="notificationInModal">Notification(s)</div>
      {notificationsArr.map((notification) => {

        const locationId = notification.scheduling?.location_id;
        const location = locationsArr.find((location) => location.id === locationId);
        const { scheduling } = notification;

        return (
          <>
            <li className="notifications-list" key={notification?.id}>
              {notification.type === "friend-request" ? (
                <>
                  {`${notification?.other_user.username} sent you a friend request.`}
                  <button onClick={() => handleFriendRequest(notification.id)}>Accept</button>
                  <button onClick={() => handleDecline(notification)}>Decline</button>
                </>
              ) : (
                <>
                  {`${notification?.other_user.username} wants to schedule a Hang out at ${location?.location_name}, ${new Date(notification?.scheduling?.date).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })} at ${new Date(`1970-01-01T${notification.scheduling?.time_start}`).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })} to ${new Date(`1970-01-01T${notification.scheduling?.time_end}`).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`}

                  <button onClick={() => handleAccept(scheduling, notification.id)}>Accept</button>
                  <button onClick={() => handleDecline(notification)}>Decline</button>
                </>
              )}
            </li>
          </>
        )
      })}
    </ul>
  )

}

export default NotificationsModal
