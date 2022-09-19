import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { thunkGetUser } from "../../../store/users";
import { thunkEditUser } from "../../../store/session";
import { thunkEditPfp } from "../../../store/session";
import "./AccountEditPage.css";

export default function AccountEditPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const userId = user.id;

  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState((user && user.full_name) || "");
  const [username, setUsername] = useState((user && user.username) || "");
  const [website, setWebsite] = useState((user && user.website) || "");
  const [bio, setBio] = useState((user && user.bio) || "");
  const [email, setEmail] = useState((user && user.email) || "");
  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.phone_number) || ""
  );
  const [gender, setGender] = useState((user && user.gender) || "");
  const [profilePicture, setProfilePicture] = useState(
    (user && user.profile_picture) || ""
  );

  useEffect(() => {
    dispatch(thunkGetUser(user.username));
  }, [dispatch, user]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (user.id == 1) {
      return window.alert("Cannot edit demo user. Try making a new user :)");
    }

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(user);
      return;
    }

    const updatedUser = await dispatch(
      thunkEditUser(
        userId,
        fullName,
        username,
        website,
        bio,
        email,
        phoneNumber,
        gender
      )
    );
    if (updatedUser.id) {
      history.push(window.location.pathname);
      return;
    }

    // IF WE GET ERRORS BACK BECAUSE THATS THE ONLY ARR WED GET BACK. COMMENT WOULD BE AN OBJECT.
    if (Array.isArray(updatedUser)) {
      // SET OUT ERROR STATE TO OUR NEW ERRORS WE GOT FROM SUBMITTAL
      setErrors(updatedUser);
      // IF IT FAILS TO CREATE A COMMENT BUT DOESNT RETURN ERRORS IN THE ARRAY
    } else {
      // setContent("");
      return;
    }
  };

  const pfpSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (user.id == 1) {
      return window.alert("Cannot edit demo user. Try making a new user :)");
    }

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(user);
      return;
    }

    const updatedPfp = await dispatch(thunkEditPfp(profilePicture, userId));
    if (updatedPfp) {
      history.push(window.location.pathname);
      return;
    }

    // IF WE GET ERRORS BACK BECAUSE THATS THE ONLY ARR WED GET BACK. COMMENT WOULD BE AN OBJECT.
    if (Array.isArray(updatedPfp)) {
      // SET OUT ERROR STATE TO OUR NEW ERRORS WE GOT FROM SUBMITTAL
      setErrors(updatedPfp);
      // IF IT FAILS TO CREATE A COMMENT BUT DOESNT RETURN ERRORS IN THE ARRAY
    } else {
      // setContent("");
      return;
    }
  };

  const updatedProfilePicture = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  if (!user) {
    return null;
  }
  return (
    <main className="user-edit-entire-page">
      <div className="user-edit-form-and-sidebar-container">
        <div className="user-edit-sidebar">
          <div className="sidebar-list-item">
            <span style={{ marginRight: "4px" }}>Edit </span>
            <span> profile</span>
          </div>
          <div className="sidebar-list-item">
            <span style={{ marginRight: "4px" }}>Change </span>
            <span> password</span>
          </div>
        </div>
        <div className="user-edit-form-container">
          <form onSubmit={pfpSubmit}>
            <div className="pfp-container">
              <div className="pfp-image-container">
                <img src={profilePicture} className="user-pfp-user-edit-form" />
              </div>
              <div className="input-section">
                <div className="pfp-container-text">{user.username}</div>
                <label htmlFor="image-upload-button" className="imput-label">
                  <input
                    id="image-upload-button"
                    name="image"
                    type="file"
                    accept="image/*"
                    // dataText="Change profile photo"
                    onChange={updatedProfilePicture}
                  />
                </label>
                {profilePicture && (
                  <span
                    htmlFor="image-upload-button"
                    name="image"
                    className="imput-label"
                  >
                    {/* {image.name} */}
                  </span>
                )}
                <div>
                  <button className="change-pfp-button">
                    Change profile photo
                  </button>
                </div>
              </div>
            </div>
            {/* ----- IMAGE INPUT ----- ^^*/}
          </form>
          <form onSubmit={formSubmit} className="user-edit-form-inputs">
            <div>
              <ul>
                {errors &&
                  errors.map((error) => {
                    let splitError = error.split(":");
                    let firstPart = splitError[0];
                    let firstLetter = firstPart[0].toUpperCase();
                    let secondPart = splitError[1].slice(11, 23);
                    return <li key={error}>{splitError[1]}</li>;
                  })}
              </ul>
            </div>
            <div className="custom-search">
              <div>
                <label htmlFor="full_name">Name</label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Name"
                  className="user-form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-description-text">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </div>
              <div
                className="form-description-text"
                style={{ marginTop: "0px", marginBottom: "21px" }}
              >
                You can only change your name twice within 14 days.
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="user-form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div
                className="form-description-text"
                style={{ marginBottom: "32px" }}
              >
                In most cases, you'll be able to change your username back to{" "}
                {user.username} for another 14 days. Learn more
              </div>
              <div
                className="user-edit-single-input"
                style={{ marginBottom: "16px" }}
              >
                <label htmlFor="website">Website</label>
                <input
                  name="website"
                  type="text"
                  placeholder="Website"
                  className="user-form-input"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div
                className="user-edit-text-area-container user-edit-single-input"
                style={{ marginBottom: "0px", paddingBottom: "0px" }}
              >
                <label htmlFor="bio">Bio</label>
                <textarea
                  name="bio"
                  type="text"
                  placeholder=""
                  className="user-form-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div
                className={
                  bio.length <= 150
                    ? "bio-length bio-length-normal"
                    : "bio-length bio-length-red"
                }
              >
                {bio.length} / 150
              </div>
              <div className="form-text-personal-information">
                Personal information
              </div>
              <div className="form-text-personal-information-description">
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </div>
              <div className="user-edit-single-input">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="user-form-input"
                  style={{ marginTop: "0px", paddingTop: "0px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="user-edit-single-input">
                <label htmlFor="phone_number">Phone number</label>
                <input
                  name="phone_number"
                  type="text"
                  placeholder="Phone number"
                  className="user-form-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="user-edit-single-input">
                <label htmlFor="gender">Gender</label>
                <input
                  name="gender"
                  type="text"
                  placeholder="Gender"
                  className="user-form-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              {userId ? (
                <div className="user-edit-submit-button-container">
                  <button className="user-edit-submit-button">Submit</button>
                </div>
              ) : (
                <button className="user-edit-submit-button-disabled" disabled>
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
