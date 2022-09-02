import React, { useState, useEffect } from "react";
import CrossfadeImage from "react-crossfade-image";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import phoneImg1 from "../../../images/phone-screen1.jpg";
import phoneImg2 from "../../../images/phone-screen2.jpg";
import phoneImg3 from "../../../images/phone-screen3.jpg";
import phoneImg4 from "../../../images/phone-screen4.jpg";
import phoneImg from "../../../images/phone-image.png";

import { login } from "../../../store/session";
import appStoreButton from "../../../images/Download-on-the-App-Store-Button.png";
import googlePlayButton from "../../../images/Get-It-On-Google-Play-Button.png";

import "./LoginFormCreate.css";

const LoginFormPosts = ({ setShowLogin, setShowSignup }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  // CROSSFADE START
  const [curImg, setCurImg] = useState(0);
  const images = [phoneImg1, phoneImg2, phoneImg3, phoneImg4];

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      if (curImg < 3) {
        setCurImg((img) => img + 1);
      } else {
        setCurImg(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [curImg]);
  // CROSSFADE END

  // Password toggle handler
  const togglePassword = async (e) => {
    e.preventDefault();
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const validateInputs = () => {
    if (password.length > 6 && email) return true;
    else return false;
  };

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="entire-page">
      <div className="form-and-img-container">
        <div className="img-container">
          <img className="phone-image" src={phoneImg} />
          <div className="crossfade-container">
            <CrossfadeImage
              src={images[curImg]}
              duration={1000}
              timingFunction={"ease-out"}
              id="fading-images"
              style={{
                // border: "1px solid orange",
                width: "252px",
                // height:'100px',
                // zIndex: "-1",
              }}
            />
          </div>
        </div>
        <div className="complete-form-container">
          <div className="logo-container">
            <div className="logo"></div>
          </div>
          <form onSubmit={onLogin} className="main-form-container">
            <div>
              {/* IF THERE IS A POST, DISPLAY THE TEXT "Update Your Post" AND LIST ANY ERRORS */}
              <ul>
                {errors &&
                  errors.map((error) => {
                    let splitError = error.split(":");
                    let firstPart = splitError[0];
                    let firstLetter = firstPart[0].toUpperCase();
                    let secondPart = splitError[1].slice(11, 23);
                    return (
                      <li
                        key={error}
                        style={{
                          color: "white",
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
          <div className="form-container-2">
            <span>Don't have an account? </span>
            <NavLink
              id="signup-reroute"
              to={"/signup"}
              onClick={() => setShowLogin(false)}
            >
              {" "}
              Sign up
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

export default LoginFormPosts;
