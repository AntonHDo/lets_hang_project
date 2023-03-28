import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import "./SignupForm.css";

function SignupPageOne({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dateOfBirth,
  setDateOfBirth,
  handleSaveStepOne,
  errors,
  setErrors }) {
  const dispatch = useDispatch();
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      dateOfBirth !== "" &&
      email !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [firstName, lastName, dateOfBirth, email, username, password, confirmPassword]);


  return (
    <>
      <h1>Sign Up</h1>
      <form >
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

        <label>
          Date Of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            placeholder="mm-dd-yyyy"
          />
        </label>

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
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
        </label>
        <button onClick={(e) => {
          e.preventDefault();
          handleSaveStepOne();
        }} disabled={disableNext}>Next</button>
      </form>
    </>
  );
}

export default SignupPageOne;
