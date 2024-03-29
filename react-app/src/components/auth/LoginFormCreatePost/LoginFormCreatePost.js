import React, { useState, useEffect } from "react";
import CrossfadeImage from "react-crossfade-image";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
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
  const [validateInputs, setValidateInputs] = useState();

  // CROSSFADE START
  const [curImg, setCurImg] = useState(0);
  const images = [phoneImg1, phoneImg2, phoneImg3, phoneImg4];

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

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

  const togglePassword = async (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (password.length >= 6 && email) setValidateInputs(true);
    else setValidateInputs(false);
  }, [password, email]);

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

  if (user) {
    return <Redirect to="/home" />;
  }

  const demoLogIn = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    history.push("/home");
  };

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
                width: "252px",
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
                ----------------------------- <span id="or-word">OR</span>{" "}
                ------------------------------
              </div>
              <div id="signup-demo-button-container">
                <button id="signup-demo-button" onClick={demoLogIn}>Login as demo user</button>
              </div>
            </div>
          </form>
          <div className="form-container-2">
            <span>Don't have an account? </span>
            <NavLink id="signup-reroute" to={"/signup"}>
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
