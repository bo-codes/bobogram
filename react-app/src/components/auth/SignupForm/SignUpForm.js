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
    if (password.length >= 6 && email && username) setValidateInputs(true);
    else setValidateInputs(false);
  }, [password, email]);

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
    <div className="entire-page">
      <div className="form-and-img-container">
        <div className="complete-form-container">
          <div className="logo-container">
            <div className="logo"></div>
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
            <div className="login-fields-and-btns">
              <div className="login-fields">
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
              {/* LOGIN BUTTON */}
              {validateInputs && (
                <button type="submit" className="login-button">
                  Log In
                </button>
              )}
              {!validateInputs && (
                <button className="login-button-disabled" disabled>
                  Log In
                </button>
              )}
              <div className="or-lines">
                ----------------------------------------{" "}
                <span id="or-word">OR</span>{" "}
                -----------------------------------------
              </div>
            </div>
          </form>
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
