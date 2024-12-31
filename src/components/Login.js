import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNotification from "./CustomNotification";
//Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
const Login = ({ setCurrentUser }) => {
  //States
  const [isShow, setIsShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifType, setNotifType] = useState("");
  //Handlers
  const navigate = useNavigate();
  function handleRevealPassword() {
    setIsShow(!isShow);
  }
  function handleOnChangeUsername(username) {
    setUsername(username);
  }
  function handleOnChangePassword(password) {
    setPassword(password);
  }
  async function findUser(username) {
    try {
      const res = await axios.get("http://localhost:3000/User/" + username);
      const user = res.data.user[0];
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await findUser(username);
    if (!user) {
      setNotifTitle("Alert Error");
      setNotifMessage("Wrong username or password ! try again");
      setNotifType("alert");
      setShowNotif(true);
    } else {
      if (password === user.password) {
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      } else {
        setNotifTitle("Alert Error");
        setNotifMessage("Wrong username or password ! try again");
        setNotifType("alert");
        setShowNotif(true);
      }
    }
  }

  return (
    <>
      <CustomNotification
        type={notifType}
        message={notifMessage}
        title={notifTitle}
        showNotification={showNotif}
        setShowNotification={setShowNotif}
      />
      <div className="login-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label className="labels">Username</label>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="icons" />
              <input
                type="text"
                className="inputs"
                placeholder="Type your username"
                required
                value={username}
                onChange={(e) => handleOnChangeUsername(e.target.value)}
              />
            </div>
            <label className="labels">Password</label>
            <div className="password-field">
              <FontAwesomeIcon icon={faLock} className="icons" />
              <input
                type={isShow ? "text" : "password"}
                placeholder="Type your password"
                required
                value={password}
                onChange={(e) => handleOnChangePassword(e.target.value)}
              />
              <FontAwesomeIcon
                className="iconEye"
                icon={isShow ? faEye : faEyeSlash}
                onClick={handleRevealPassword}
              />
            </div>
            <a href="/forgetpassword">Forgot password?</a>
            <button className="btn login">Sign In</button>
          </form>
        </div>
        <div className="panel">
          <FontAwesomeIcon icon={faUserTie} className="iconUserTie" />
          <h1>Welcome back!</h1>
          <p>Please login to continue</p>
        </div>
      </div>
    </>
  );
};

export default Login;
