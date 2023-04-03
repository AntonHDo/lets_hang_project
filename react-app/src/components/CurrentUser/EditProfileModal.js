import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CurrentUser.css";
import { editUserInfo } from "../../store/session";

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

  const validateForm = () => {
    const errors = []
    if (firstName.length > 255) {
      errors.push("Theres no way thats your first name right? It's over 255 characters!")
    }

    if (lastName.length > 255) {
      errors.push("Theres no way thats your last name right? It's over 255 characters!")
    }

    if (bio.length > 2000) {
      errors.push("bio cannot exceed 2000 characters")
    }

    return errors
  };


  const checkImageExists = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const errors = validateForm()
    try {
      await checkImageExists(profilePicture);
    } catch (error) {
      errors.push("The provided image URL is invalid or cannot be loaded.");
    }
    if (errors.length === 0) {
      const defaultImageUrl = "https://i.imgur.com/cXPKYuE.png";
      const finalProfilePicture = profilePicture || defaultImageUrl;
      const updatedInfo = {
        ...currentUser,
        first_name: firstName,
        last_name: lastName,
        location_id: location,
        gender,
        about_me: bio,
        profile_picture: finalProfilePicture
      }
      await dispatch(editUserInfo(currentUser.id, updatedInfo));

      closeModal();
    } else {
      setErrors(errors)
    }
  };

  const locationsArr = Object.values(locations)

  return (
    <>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
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
            placeholder="Please provide a valid profile picture"

          />
        </label>
        <button type="submit" disabled={disable}>Update</button>
      </form>
    </>
  )
}


export default EditProfileModal
