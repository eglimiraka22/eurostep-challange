// components/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectAuth } from "../../store/slices/authSlice";
import styles from "./style.module.css";
const Login = ({ onClick }) => {
  const dispatch = useDispatch();
  const { error, authenticated } = useSelector(selectAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginAsync(username, password));
  };
  useEffect(() => {
    // Check for changes in the authenticated state
    if (authenticated) {
      onClick();
    }
  }, [authenticated, onClick]);
  return (
    <div className={styles.loginOverlay} onClick={onClick}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.loginContainer}
      >
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
