import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";

import "./logoutButton.css";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout()).then(() => {
      history.push(`/`);
      return;
    });
  };

  return (
    <button className="dropdown-logout-button" onClick={onLogout}>
      <div className="dropdown">Log Out</div>
    </button>
  );
};

export default LogoutButton;
