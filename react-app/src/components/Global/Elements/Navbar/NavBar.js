import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Modal } from "../../../Global/Elements/Modal";
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import "./navBar.css";
import CreatePostForm from "../../../Posts/PostForms/CreatePostForm/CreatePostForm";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const user = useSelector((state) => state.session.user);

  const [loggedIn, setLoggedIn] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  useEffect(() => {
    if (!user) setLoggedIn(false);
    if (user) setLoggedIn(true);
  }, [user, loggedIn]);

  const pageNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("This page is not yet available, try the other pages!");
  };

  const featureNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("Darn! This feature is not yet available.");
  };

  return (
    <div className="entire-navBar">
      {showCreatePostForm && (
        <Modal onClose={() => setShowCreatePostForm(false)}>
          <CreatePostForm setShowCreatePostForm={setShowCreatePostForm} />
        </Modal>
      )}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginFormPosts setShowLogin={setShowLogin} />
        </Modal>
      )}
      <div className="navBarWrapper">
        <div className="navBarDiv1">
          <NavLink to="/" exact={true}>
            <div className="logo-link"></div>
          </NavLink>
          <div className="logo-dropdown-arrow-container">
            <div className="logo-dropdown-arrow"></div>
          </div>
        </div>
        <div className="navBarDiv2">
          {loggedIn && user && (
            <>
              <div className="navlink-container">
                <NavLink
                  to="/home"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink
                    ${
                      window.location.pathname == "/home"
                        ? "home-link-selected"
                        : "home-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
              <div className="navlink-container">
                <button
                  onClick={featureNotAvailable}
                  activeClassName="active"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink-button
                    ${
                      window.location.pathname == "/messages"
                        ? "messages-link-selected"
                        : "messages-link"
                    }`}
                  ></div>
                </button>
              </div>
              <div className="navlink-container">
                <button
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    marginTop: "6px",
                  }}
                  onClick={() => setShowCreatePostForm(true)}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink
                    ${
                      showCreatePostForm
                        ? "create-link-selected"
                        : "create-link"
                    }`}
                  ></div>
                </button>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/explore/posts"
                  exact={true}
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink
                    ${
                      window.location.pathname == "/explore"
                        ? "explore-link-selected"
                        : "explore-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
              <div className="navlink-container">
                <button
                  onClick={pageNotAvailable}
                  activeClassName="active"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink-button
                    ${
                      window.location.pathname == "/likes"
                        ? "likes-link-selected"
                        : "likes-link"
                    }`}
                  ></div>
                </button>
              </div>
              <UserMenu user={user} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
