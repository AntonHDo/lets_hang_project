import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true)
  const [showErrorsList, setShowErrorsList] = useState(false);
  const [loginButtonClassName, setLoginButtonClassName] = useState("disabled")
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ email, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
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
      <form className={formForLogin} onSubmit={handleSubmit}>
        <ul className={errorsListName}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={loginButtonClassName} disabled={disabled}>Log In</button>

        <div className="loginDemoUserContainer">
          <Link onClick={handleDemoClick}>Demo User: Demo</Link>
        </div>

        <div className="loginMarnieContainer">
          <Link onClick={handleMarnieClick}>Demo User: Marnie</Link>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
