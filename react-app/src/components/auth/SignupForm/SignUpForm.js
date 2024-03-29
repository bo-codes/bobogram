import { signUp } from "../../../store/session";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";

import appStoreButton from "../../../images/Download-on-the-App-Store-Button.png";
import googlePlayButton from "../../../images/Get-It-On-Google-Play-Button.png";

import "./SignupForm.css";

const SignUpForm = () => {

  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [validateInputs, setValidateInputs] = useState();

  const togglePassword = async (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (password.length >= 6 && email && username && fullName) setValidateInputs(true);
    else setValidateInputs(false);
  }, [password, email, username, fullName]);

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      signUp(username, email, password, fullName)
    );
    if (data) {
      setErrors(data);
    }
  };
  // NOTE NOTE NOTE

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user) {
    return <Redirect to="/home" />;
  }

  const demoLogIn = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    history.push("/home");
  };

  return (
    <div className="signup-entire-page">
      <div className="form-and-img-container">
        <div className="complete-form-container">
          <div className="signup-logo-container">
            <div className="signup-logo"></div>
          </div>
          <form onSubmit={onSignUp} className="main-form-container">
            <div>
              <ul>
                {errors &&
                  errors.map((error) => {
                    let splitError = error.split(":");
                    return (
                      <li
                        key={error}
                        style={{
                          color: "black",
                        }}
                      >
                        <span
                          style={{
                            color: "#9387bc",
                          }}
                        >
                          ✖
                        </span>
                        {splitError[1]}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="signup-first-header">
              <div className="signup-first-header-text">
                Sign up to see photos and videos from your friends.
              </div>
              <div>
                <button
                  className="login-button"
                  style={{
                    paddingTop: "2px",
                    height: "32px",
                    fontSize: "16",
                    textDecoration: "none",
                  }}
                  onClick={demoLogIn}
                >
                  Log in as demo user
                </button>
              </div>
            </div>
            <div className="login-fields-and-btns">
              <div className="signup-fields">
                <div className="signup-or-lines">
                  -----------------------------{" "}
                  <span id="signup-or-word">OR</span>{" "}
                  ------------------------------
                </div>
                <input
                  className="login-input-box"
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={updateEmail}
                />
                <input
                  className="login-input-box"
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={updateFullName}
                />
                <input
                  className="login-input-box"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={updateUsername}
                />
                <div className="password-input-container">
                  <input
                    className="login-input-box"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                  />
                  <button
                    onClick={togglePassword}
                    className="show-password-btn"
                  >
                    {!passwordShown ? "Show" : "Hide"}
                  </button>
                </div>
              </div>
              <div id="signup-first-text">
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <span className="signup-text-bold">Learn More</span>
              </div>
              <div id="signup-second-text">
                By signing up, you agree to our{" "}
                <span className="signup-text-bold">Terms</span> ,{" "}
                <span className="signup-text-bold">Privacy Policy</span> and{" "}
                <span className="signup-text-bold">Cookies Policy</span> .
              </div>
              {/* LOGIN BUTTON */}
              {validateInputs && (
                <button type="submit" className="signup-button">
                  Sign up
                </button>
              )}
              {!validateInputs && (
                <button className="signup-button-disabled" disabled>
                  Sign up
                </button>
              )}
            </div>
          </form>
          <div className="signup-download-link-box">
            <span>Have an account? </span>
            <NavLink id="login-reroute" to={"/"}>
              {" "}
              Log in
            </NavLink>
          </div>
          <div className="form-container-3">Get the app.</div>
          <div className="form-container-4">
            <Link
              to={{
                pathname: "https://www.bo-codes.co",
              }}
              target="_blank"
            >
              <img src={appStoreButton} className="store-links" />
            </Link>
            <Link
              to={{
                pathname: "https://www.bo-codes.co",
              }}
              target="_blank"
            >
              <img src={googlePlayButton} className="store-links" />
            </Link>
          </div>
        </div>
      </div>
      <div className="little-footer"></div>
    </div>
  );
};

export default SignUpForm;
