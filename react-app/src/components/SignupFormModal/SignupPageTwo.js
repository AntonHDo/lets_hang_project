import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { fetchLocations } from "../../store/locations";
import "./SignupForm.css";

function SignupPageTwo({
  email,
  username,
  password,
  firstName,
  lastName,
  dateOfBirth,
  profilePicture,
  setProfilePicture,
  location,
  setLocation,
  gender,
  setGender,
  bio,
  setBio,
  goToPreviousStep,
  handleSaveStepTwo,
  validateForm }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const locations = useSelector(state => state.locations.locations)
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { closeModal } = useModal();

  const checkImageExists = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  };

  useEffect(() => {
    dispatch(fetchLocations())
  }, [dispatch])



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
      await dispatch(signUp(username, email, password, firstName, lastName, dateOfBirth, location, gender, bio, finalProfilePicture));
      handleSaveStepTwo();
      closeModal();
    } else {
      setErrors(errors)
    }


  };

  useEffect(() => {
    if (
      location !== "" &&
      gender !== "" &&
      bio !== ""
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [location, gender, bio, profilePicture]);

  if (!locations) {
    return <div>Loading...</div>
  }


  const locationsArr = Object.values(locations)

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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

        <button onClick={() => goToPreviousStep()}>Back</button>
        <button type="submit" disabled={disableSubmit}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupPageTwo;
