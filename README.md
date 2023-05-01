# Lets Hang!

Lets Hang is a web-app that was inspired by passion for rock climbing, where fellow climbers can find a climbling partner and send harder than ever!

## Wiki
* Feature List
* Schema
* User Stories
* Wireframes

## Technologies
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Features

### User
* Sign up for an account.
* Log in to an existing account.
* Edit profile information, including profile picture, bios, and location.
* Delete their account.

<br/>

![](https://github.com/AntonHDo/lets_hang_project/blob/main/assets/CreateUser2.gif?raw=true)
![](https://github.com/AntonHDo/lets_hang_project/blob/main/assets/createUser.gif?raw=true)
```javascript
const handleCheckUsernameEmail = async () => {
  const { usernameExists, emailExists } = await dispatch(checkExistingUsernameEmail(username, email));

  const errors = validateForm()

  if (usernameExists) {
    errors.push('Username already exists')
  }
  if (emailExists) {
    errors.push("Email already exists");
  }
  if (errors.length === 0) {
    setErrors([]);
    dispatch(saveStepOneData(username, email, password, firstName, lastName, dateOfBirth));
    goToNextStep();
  } else {
    setErrors(errors);
  }
};

const handleSaveStepTwo = () => {
  dispatch(saveStepTwoData(location, gender, bio, profilePicture));
};
```

### Friends
* Send friend requests to other users.
* Accept or decline friend requests.
* View the list of friends.
* Remove friends from their friend list.

<br/>

![](https://github.com/AntonHDo/lets_hang_project/blob/main/assets/Friends.gif?raw=true)

```javascript
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
 ```

### Scheduling
* Create a new Hang Out event at a specific location and time.
* View the list of scheduled Hang Outs they are a part of.
* Update the details of a Hang Out (location, date, and time).
* Delete a Hang Out event.
* Invite member to join a Hang Out.
* Accept or decline Hang Out invitations.

<br/>

![](https://github.com/AntonHDo/lets_hang_project/blob/main/assets/scheduling.gif?raw=true)


```javascript
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
  ```

### Notifications
* Receive notifications for friend requests and Hang Out invitations.
* View the list of notifications.
* Accept or decline friend requests and Hang Out invitations directly from the notifications list.

<br/>

![](https://github.com/AntonHDo/lets_hang_project/blob/main/assets/notificaitons.gif?raw=true)

```javascript
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
    await dispatch(fetchCurrentUserFriends(currentUser?.id))
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
  ```
