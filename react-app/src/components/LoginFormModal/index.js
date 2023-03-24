import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, [closeModal]);
  const handleDemo1Click = async () => {
    const data = await dispatch(login("demo@aa.io", "password"))
    closeModal()
  }

  const handleDemo2Click = async () => {
    const data = await dispatch(login("marnie@aa.io", "password"))
    closeModal()
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
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
        <button type="submit">Log In</button>
        <div className="loginDemoUser1Container">
          <button className="loginDemoUser1Button" onClick={handleDemo1Click}>Demo User 1</button>
        </div>
        <div className="loginDemoUser2Container">
          <button className="loginDemoUser2Button" onClick={handleDemo2Click}>Demo User 2</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
