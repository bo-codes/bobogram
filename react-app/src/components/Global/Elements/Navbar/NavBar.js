import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import { login } from "../../../../store/session";
import { Modal } from "../../../Global/Elements/Modal";
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import "./navBar.css";
import CreatePostForm from "../../../Posts/PostForms/CreatePostForm/CreatePostForm";

const NavBar = () => {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currentPage = window.location.href.split("/")[-1];

  const [loggedIn, setLoggedIn] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  useEffect(() => {
    if (!user) setLoggedIn(false);
    if (user) setLoggedIn(true);
  }, [user, loggedIn]);

  const demoLogIn = () => {
    dispatch(login("demo@aa.io", "password"));
    history.push("/home");
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
          {/* {!loggedIn && (
            <>
              <div className="navlink-container">
                <button onClick={demoLogIn} className="navlink">
                  Demo
                </button>
              </div>
              <div className="navlink-container">
                <button className="navlink" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              </div>
              <div className="navlink-container">
                <NavLink
                  to="/signup"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <p className="navlink">Signup</p>
                </NavLink>
              </div>
            </>
          )} */}
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
                <NavLink
                  to="/messages"
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink
                    ${
                      window.location.pathname == "/messages"
                        ? "messages-link-selected"
                        : "messages-link"
                    }`}
                  ></div>
                </NavLink>
              </div>
              <div className="navlink-container">
                <button
                  style={{ textDecoration: "none", backgroundColor: 'transparent', marginTop: '6px' }}
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
                <NavLink
                  to="/likes"
                  exact={true}
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{ textDecoration: "none" }}
                    className={`navlink
                    ${
                      window.location.pathname == "/likes"
                        ? "likes-link-selected"
                        : "likes-link"
                    }`}
                  ></div>
                </NavLink>
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
