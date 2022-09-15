import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import './AccountEditPage.css'

export default function AccountEditPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const userId = user.id

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

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(user);
      return;
    }

    // user = await dispatch(makeComment(userId, postId, content, date));
    if (user.id) {
      history.push(window.location.pathname);
      return;
    }

    // IF WE GET ERRORS BACK BECAUSE THATS THE ONLY ARR WED GET BACK. COMMENT WOULD BE AN OBJECT.
    if (Array.isArray(user)) {
      // SET OUT ERROR STATE TO OUR NEW ERRORS WE GOT FROM SUBMITTAL
      setErrors(user);
      // IF IT FAILS TO CREATE A COMMENT BUT DOESNT RETURN ERRORS IN THE ARRAY
    } else {
      // setContent("");
      return;
    }
  };

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
        <form onSubmit={submit}>
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
