import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "../../../auth/LogoutButton";
import "./navBar.css";

const MenuButton = styled.div`
  cursor: pointer;
`;

function UserMenu({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (!showMenu) return setShowMenu(true);
  };

  const closeMenu = (e) => {
    if (
      e.target.classList.contains("dropdown") ||
      e.target.classList.contains("profile-icon")
    )
      return;
    setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [showMenu]);

  const pageNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("This page is not yet available, try the other pages!");
  };

  const featureNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("Darn! This feature is not yet available.");
  };

  return (
    <>
      <MenuButton onClick={openMenu}>
        <div className="profile-container">
          <div className="user-profile-container">
            <div
              className="profile-icon"
              style={{
                backgroundImage: `url(${user.profile_picture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "none",
                borderRadius: "15px",
                height: "24px",
                width: "24px",
                marginRight: "0px",
                float: "left",
              }}
            ></div>
          </div>
        </div>
      </MenuButton>
      {showMenu && (
        <div style={{ position: "relative" }}>
          <div className="dropdown-container">
            <NavLink
              to={`/${user.username}`}
              activeClassName="active"
              className="dropdown-button profile-btn"
            >
              <div className="usermenu-profile-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">Profile</div>
            </NavLink>
            <button
              activeClassName="active"
              className="dropdown-button"
              style={{ backgroundColor: "transparent" }}
              onClick={pageNotAvailable}
            >
              <div className="usermenu-saved-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">Saved</div>
            </button>
            <button
              to="/settings"
              activeClassName="active"
              className="dropdown-button"
              style={{ backgroundColor: "transparent" }}
              onClick={pageNotAvailable}
            >
              <div className="usermenu-settings-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">Settings</div>
            </button>
            <button
              to="/switch"
              activeClassName="active"
              className="dropdown-button switch-btn"
              style={{ backgroundColor: "transparent" }}
              onClick={pageNotAvailable}
            >
              <div className="usermenu-switch-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">
                Switch accounts
              </div>
            </button>

            <LogoutButton className="dropdown-logout-button" />
          </div>
        </div>
      )}
    </>
  );
}

export default UserMenu;
