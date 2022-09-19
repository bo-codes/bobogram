import { signUp } from "../../../store/session";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";

import appStoreButton from "../../../images/Download-on-the-App-Store-Button.png";
import googlePlayButton from "../../../images/Get-It-On-Google-Play-Button.png";

import "./SignupForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [validateInputs, setValidateInputs] = useState();

  // Password toggle handler
  const togglePassword = async (e) => {
    e.preventDefault();
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (password.length >= 6 && email && username && fullName) setValidateInputs(true);
    else setValidateInputs(false);
  }, [password, email, username, fullName]);

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
    const data = await dispatch(
      signUp(username, email, password, fullName)
    );
    if (data) {
      setErrors(data);
    }
    // }
  };

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

  return (
    <div className="signup-entire-page">
      <div className="form-and-img-container">
        <div className="complete-form-container">
          <div className="signup-logo-container">
            <div className="signup-logo"></div>
          </div>
          <form onSubmit={onSignUp} className="main-form-container">
            <div>
              {/* IF THERE IS A POST, DISPLAY THE TEXT "Update Your Post" AND LIST ANY ERRORS */}
              <ul>
                {errors &&
                  errors.map((error) => {
                    let splitError = error.split(":");
                    // let firstPart = splitError[0];
                    // let firstLetter = firstPart[0].toUpperCase();
                    // let secondPart = splitError[1].slice(11, 23);
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
                        {/* {firstLetter + firstPart.slice(1) + secondPart} */}
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
                  }}
                >
                  See more projects
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
            Have an account? Log in
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
