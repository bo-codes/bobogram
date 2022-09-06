import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "../../../auth/LogoutButton";
import "./navBar.css";

const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 0 4px 2px black;
  border-radius: 4px;
  background-color: black;
  border: 2px solid grey
  min-width: 150px;
  top: 8px;
  left: 3px;
  padding: 5px;
  gap: 3px;
  z-index: 1000;
`;

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
                borderRadius: '15px',
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
          <DropDownMenu className="dropdown">
            {/* <NavLink
                            className="dropdown"
                            to={`/dashboard`}
                            onClick={myDash}
                            style={{ textDecoration: "none" }}>
                            <p className="navlink dropdown">My Dashboard</p>
                        </NavLink> */}
            <p className="dropdown" style={{ fontFamily: "Eina" }}>
              {user.username}
            </p>
            <p className="dropdown" style={{ fontFamily: "Eina" }}>
              {user.email}
            </p>
            <LogoutButton className="dropdown" />
          </DropDownMenu>
        </div>
      )}
    </>
  );
}

export default UserMenu;
