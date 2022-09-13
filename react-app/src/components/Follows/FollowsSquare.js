import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { thunkFollow, thunkUnfollow } from "../../store/session";
import { thunkGetUser } from "../../store/users";
import "./FollowsSquare.css";

const FollowsSquare = ({ profileUsername }) => {
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

  return (
    <>
      {sessionUser.username === profileUsername && <div></div>}
      {sessionUser.username !== profileUsername && (
        <div>
          {!follow ? (
            <button
              onClick={followButton}
              className="user-follow-button-square"
            >
              Follow
            </button>
          ) : (
            <button onClick={unfollowButton} style={{background: 'white'}}>
              <div className="user-unfollow-button-square"></div>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FollowsSquare;
