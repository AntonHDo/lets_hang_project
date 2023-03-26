import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeNotification } from "../../store/notifications";
import { fetchNotifications } from "../../store/notifications";
import { updateScheduling } from "../../store/schedulings";


const NotificationsModal = ({ notifications, locations }) => {
  const dispatch = useDispatch()
  const notificationsArr = Object.values(notifications)
  const locationsArr = Object.values(locations)
  const { closeModal } = useModal();
  const [status, setStatus] = useState()


  // useEffect(() => {
  //   dispatch(updateScheduling(notification.scheduling?.id))
  // }, [dispatch])

  const handleAccept = async (scheduling, notificationId) => {
    await dispatch(removeNotification(notificationId));
    const newScheduling = {
      ...scheduling,
      status: 'accepted'
    }

    dispatch(updateScheduling(newScheduling))
    dispatch(fetchNotifications())
    closeModal()
  }

  const handleDecline = async (notificationId) => {
    await dispatch(removeNotification(notificationId))
    dispatch(fetchNotifications())
    closeModal()
  }

  return (
    <ul>
      {notificationsArr.map((notification) => {

        const locationId = notification.scheduling?.location_id;
        const location = locationsArr.find((location) => location.id === locationId);
        const { scheduling } = notification;

        return (
          <li key={notification?.id}>
            {notification?.other_user.username} wants to schedule a Hang out at {location?.location_name}, {new Date(notification?.scheduling?.date).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })} at {new Date(`1970-01-01T${notification.scheduling?.time_start}`).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })} to {new Date(`1970-01-01T${notification.scheduling?.time_end}`).toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            <button onClick={() => handleAccept(scheduling, notification.id)}>Accept</button>
            <button onClick={() => handleDecline(notification.id)}>Decline</button>
          </li>
        )
      })}
    </ul>
  )

}

export default NotificationsModal
