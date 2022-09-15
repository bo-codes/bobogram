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
  const [profilePicture, setProfilePicture] = useState((user && user.profile_picture) || "");

  useEffect(() => {
    dispatch(thunkGetUser(user.username));
  }, [dispatch, user]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

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

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(user);
      return;
    }

    const updatedPfp = await dispatch(
      thunkEditPfp(
        profilePicture,
        userId
      )
    );
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
        <form onSubmit={pfpSubmit}>
          <div className="input-section">
            <label htmlFor="image-upload-button" className="imput-label">
              Image
              <input
                id="image-upload-button"
                name="image"
                type="file"
                accept="image/*"
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
          </div>
          {/* ----- IMAGE INPUT ----- ^^*/}
          <div>
            <div>
              <button className="login-button">Update Photo</button>
            </div>
          </div>
        </form>
        <form onSubmit={formSubmit}>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="website">Website</label>
              <input
                name="website"
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="text-area-container">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="user-edit-bio"
                name="bio"
                type="text"
                placeholder=""
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone_number">Phone number</label>
              <input
                name="phone_number"
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <input
                name="gender"
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            {userId ? (
              <button className="custom-search-button">Submit</button>
            ) : (
              <button className="custom-search-button-disabled" disabled>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
