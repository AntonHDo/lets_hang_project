import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CurrentUser.css";
import { editUserInfo } from "../../store/session";
import { fetchLocations } from "../../store/locations";

const EditProfileModal = ({ currentUser, setRefresh }) => {
  const dispatch = useDispatch()
  const locations = useSelector(state => state.locations.locations)
  const { closeModal } = useModal()

  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [dateOfBirth, setDateOfBirth] = useState(currentUser.date_of_birth);
  const [profilePicture, setProfilePicture] = useState(currentUser.profile_picture);
  const [location, setLocation] = useState(currentUser.location_id);
  const [gender, setGender] = useState(currentUser.gender);
  const [bio, setBio] = useState(currentUser.about_me);
  const [disable, setDisable] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      dateOfBirth !== "" &&
      location !== "" &&
      gender !== "" &&
      bio !== ""
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [firstName, lastName, dateOfBirth, location, gender, bio, profilePicture]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInfo = {
      ...currentUser,
      first_name: firstName,
      last_name: lastName,
      location_id: location,
      gender,
      about_me: bio,
      profile_picture: profilePicture
    }



    // username, email, password, firstName, lastName, dateOfBirth, location, gender, bio, profilePicture
    await dispatch(editUserInfo(currentUser.id, updatedInfo));

    closeModal();

  };

  const locationsArr = Object.values(locations)

  return (
    <>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        {/* <label>
          Date Of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            placeholder="mm-dd-yyyy"
          />
        </label> */}

        {/* <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label> */}
        {/* <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label> */}

        {/* <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label> */}
        <label>
          Location
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="" disabled>Select a location</option>
            {locationsArr.map((location) => (
              <option key={location.id} value={location.id}>
                {location.location_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Gender
          <select
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>Select a Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>
        <label>
          Bio
          <textarea
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </label>
        <label>
          Profile Picture
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="https://i.imgur.com/cXPKYuE.png"

          />
        </label>
        <button type="submit" disabled={disable}>Update</button>
      </form>
    </>
  )
}


export default EditProfileModal
