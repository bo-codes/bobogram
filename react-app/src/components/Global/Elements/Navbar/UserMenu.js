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

  const myDash = async () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 1);
  };

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
              to="/profile"
              activeClassName="active"
              className="dropdown-button profile-btn"
            >
              <div className="usermenu-profile-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">Profile</div>
            </NavLink>
            <NavLink
              to="/saved"
              activeClassName="active"
              className="dropdown-button"
            >
              <div className="usermenu-saved-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">Saved</div>
            </NavLink>
            <NavLink
              to="/settings"
              activeClassName="active"
              className="dropdown-button"
            >
              <div className="usermenu-settings-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">Settings</div>
            </NavLink>
            <NavLink
              to="/switch"
              activeClassName="active"
              className="dropdown-button switch-btn"
            >
              <div className="usermenu-switch-icon dropdown"></div>
              <div className="dropdown-button-text dropdown">
                Switch accounts
              </div>
            </NavLink>

            <LogoutButton className="dropdown-logout-button" />
          </div>
        </div>
      )}
    </>
  );
}

export default UserMenu;
