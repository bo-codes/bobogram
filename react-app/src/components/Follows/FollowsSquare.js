import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { thunkFollow, thunkUnfollow } from "../../store/session";
import { thunkGetUser } from "../../store/users";
import "./FollowsSquare.css";

const FollowsSquare = ({
  profileUsername,
  setShowSuggestions,
  showSuggestions,
  setShowUserOptions,
  showUserOptions
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const sessionUser = useSelector((state) => state.session.user);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    for (let i = 0; i < sessionUser.following.length; i++) {
      let user = sessionUser.following[i];
      if (user.username === profileUsername) {
        setFollow(true);
      }
    }
  }, [sessionUser.following, profileUsername]);

  const optionsButton = (e) => {
    setShowUserOptions(!showUserOptions)
  }

  const followButton = async (e) => {
    setFollow(true);
    await dispatch(thunkFollow(profileUsername));

    // if (follow) {
    //   if (follow.username === profileUsername) {
    //     dispatch(thunkGetUser(profileUsername));
    //   }
    //   if (sessionUser.username === profileUsername) {
    //     dispatch(thunkGetUser(profileUsername));
    //   }
    // }
  };

  const unfollowButton = async (e) => {
    setFollow(false);
    await dispatch(thunkUnfollow(profileUsername));

    // if (unfollow) {
    //   if (unfollow.username === profileUsername) {
    //     dispatch(thunkGetUser(profileUsername));
    //   }
    //   if (sessionUser.username === profileUsername) {
    //     dispatch(thunkGetUser(profileUsername));
    //   }
    // }
  };

  const suggestionsButton = (e) => {
    setShowSuggestions(!showSuggestions);
  };

  return (
    <>
      {sessionUser.username === profileUsername && (
        <div>
          <Link to='/accounts/edit' className="user-edit-profile-button-square">
            Edit profile
          </Link>
        </div>
      )}
      {sessionUser.username !== profileUsername && (
        <div>
          {!follow ? (
            <div className="follow-button-container">
              <button
                onClick={followButton}
                className="user-follow-button-square"
              >
                Follow
              </button>
              {showSuggestions ? (
                <button
                  onClick={suggestionsButton}
                  className="suggestions-button-pfp-blue"
                >
                  <div className="user-suggestions-button-opened-pfp-blue"></div>
                </button>
              ) : (
                <button
                  onClick={suggestionsButton}
                  className="suggestions-button-pfp-blue"
                >
                  <div className="user-suggestions-button-pfp-blue"></div>
                </button>
              )}
              <button
                className="user-options-button-pfp-container"
                onClick={optionsButton}
              >
                <div className="user-options-button-pfp"></div>
              </button>
            </div>
          ) : (
            <div className="follow-button-container">
              <button onClick={unfollowButton} style={{ background: "white" }}>
                <div className="user-unfollow-button-square"></div>
              </button>
              {showSuggestions ? (
                <button
                  className="suggestions-button-pfp"
                  onClick={suggestionsButton}
                >
                  <div className="user-suggestions-button-opened-pfp"></div>
                </button>
              ) : (
                <button
                  onClick={suggestionsButton}
                  className="suggestions-button-pfp"
                >
                  <div className="user-suggestions-button-pfp"></div>
                </button>
              )}
              <button
                className="user-options-button-pfp-container"
                onClick={optionsButton}
              >
                <div className="user-options-button-pfp"></div>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FollowsSquare;
