import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true)
  const [showErrorsList, setShowErrorsList] = useState(false);
  const [errors, setErrors] = useState([]);
  const [invalidCredentials, setInvalidCredentials] = useState(false); // New state for invalid credentials error
  const [loginButtonClassName, setLoginButtonClassName] = useState("disabled")
  const { closeModal } = useModal();

  // Add a more comprehensive email validation check, looks crazy but it justs shows the possible combos for emails
  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    let errors = [];
    if (!isValidEmail(email)) {
      errors.push('Invalid email.');
    }
    if (password.length < 6) {
      errors.push('Password is too short');
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    setShowErrorsList(true);

    if (formErrors.length > 0) {
      return;
    }

    // const res = await dispatch(login({ email, password }));

    const loginErrors = await dispatch(login(email, password));

    if (loginErrors) {
      setErrors(loginErrors);
    } else {
      closeModal();
    }
  };
  const handleDemoClick = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login("demo@aa.io", "password"))
      .then(closeModal)
      .catch(
        async (res) => {
          setShowErrorsList(true)
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };
  const handleMarnieClick = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login("marnie@aa.io", "password"))
      .then(closeModal)
      .catch(
        async (res) => {
          setShowErrorsList(true)
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  useEffect(() => {
    if (email.length < 4 || password.length < 6) {
      setDisabled(true)
      setLoginButtonClassName("disabled")
      return
    }
    setLoginButtonClassName("enabled")
    setDisabled(false)
  }, [password, email])

  const errorsListName = "error-list" + (showErrorsList ? "" : " hidden");

  const formForLogin = "login-form" + (showErrorsList ? " with-errors" : "");


  return (
    <>
      <h1>Log In</h1>
      <form className={formForLogin} autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" name="username" autoComplete="username" style={{ display: "none" }} />
        <input type="password" name="password" autoComplete="current-password" style={{ display: "none" }} />
        <ul className={errorsListName}>
          {invalidCredentials && <li>Invalid credentials. Please try again.</li>} {/* Display invalid credentials error after 1000 hrs of s */}
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <label>
          Email
          <input
            autoComplete="off"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </label>


        <label>
          Password
          <input
            autoComplete="off"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </label>

        <button type="submit" className={loginButtonClassName} disabled={disabled}>Log In</button>

        <div className="demoAndMarnieContainer">

          <div className="loginDemoUserContainer">
            <Link onClick={handleDemoClick}>Demo User: Demo</Link>
          </div>

          <div className="loginMarnieContainer">
            <Link onClick={handleMarnieClick}>Demo User: Marnie</Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
