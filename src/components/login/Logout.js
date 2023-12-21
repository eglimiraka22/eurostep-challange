// components/Logout.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform logout
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
