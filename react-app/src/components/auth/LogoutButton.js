import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Redirect } from "react-router-dom";

import "./logoutButton.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout()).then(() => {
      return <Redirect to="/" />;
    });
  };

  return (
    <button className="dropdown-logout-button" onClick={onLogout}>
      <div className="dropdown">Log Out</div>
    </button>
  );
};

export default LogoutButton;
