import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { thunkFollow, thunkUnfollow } from "../../store/session";
import "./Follows.css";

const Follows = ({ profileUsername }) => {
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

  const followButton = async (e) => {
    setFollow(true);
    await dispatch(thunkFollow(profileUsername));
  };

  const unfollowButton = async (e) => {
    setFollow(false);
    await dispatch(thunkUnfollow(profileUsername));
  };

  return (
    <>
      {sessionUser.username === profileUsername && <div></div>}
      {sessionUser.username !== profileUsername && (
        <div>
          {!follow ? (
            <button onClick={followButton} className="user-follow-button">
              Follow
            </button>
          ) : (
            <button onClick={unfollowButton} className="user-follow-button">
              Unfollow
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Follows;
