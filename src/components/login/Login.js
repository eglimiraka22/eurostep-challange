// components/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectAuth } from "../../store/slices/authSlice";

const Login = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(selectAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginAsync(username, password));
  };

  return (
    <div>
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
  );
};

export default Login;
