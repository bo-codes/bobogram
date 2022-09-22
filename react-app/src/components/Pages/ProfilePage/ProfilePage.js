// REACT STUFF --------
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// --------COMPONENTS -------- //
import FollowsSquare from "../../Follows/FollowsSquare";
import UserOptionsForm from "../../Posts/PostForms/CreatePostForm/UserOptionsForm";
import PostCardExplore from "../../Posts/Elements/PostCard/PostCardExplore";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllLikes } from "../../../store/likes";
import { getOneUserPostsThunk } from "../../../store/posts";
import { thunkGetUser } from "../../../store/users";
import { Modal } from "../../Global/Elements/Modal";
// -------- CSS/IMAGES -------- //
import "./ProfilePage.css";

function ProfilePage({}) {
  const dispatch = useDispatch();
  const { username } = useParams();

  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.user[username]);
  const sessionUser = useSelector((state) => state.session.user);
  const likes = Object.values(useSelector((state) => state.likes));

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  let followingList = sessionUser.following.map((user) => {
    return user.username;
  });

  useEffect(() => {
    dispatch(getAllCommentsThunk());

    dispatch(getAllLikes());
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(thunkGetUser(username));
    dispatch(getOneUserPostsThunk(username));
    console.log(sessionUser.following);
  }, [dispatch, username, sessionUser.following]);

  if (!user) {
    return null;
  }

  if (!posts) {
    return null;
  }

  let userPosts;
  if (user) {
    userPosts = posts.filter((post) => post.user_id === user.id);
  }

  return (
    <main className="entire-profile-page">
      <div className="top-section-container">
        <div className="top-section">
          <div className="pfp-profile-page-container">
            <img src={user.profile_picture} className="pfp-profile-page" />
          </div>
          <div className="info-section-profile-page">
            <div className="name-and-btns-profile-page-container">
              <div className="name-profile-page">{user.username}</div>
              <div className="btns-profile-page">
                <FollowsSquare
                  followingList={followingList}
                  profileUsername={user.username}
                  setShowSuggestions={setShowSuggestions}
                  showSuggestions={showSuggestions}
                  setShowUserOptions={setShowUserOptions}
                  showUserOptions={showUserOptions}
                  className="btn-profile-page"
                />
              </div>
            </div>
            <div className="numbers-profile-page-container">
              <div className="posts-number-profile-page metric">
                <span className="profile-number">{userPosts.length}</span> posts
              </div>
              <div className="followers-number-profile-page metric">
                <span className="profile-number">{user.followers.length}</span>{" "}
                followers
              </div>
              <div className="following-number-profile-page metric">
                <span className="profile-number">{user.following.length}</span>{" "}
                following
              </div>
            </div>
            <div className="user-full-name-profile-page">{user.full_name}</div>
            <div className="user-bio-profile-page">{user.bio}</div>
          </div>
        </div>
      </div>
      {showSuggestions && (
        <div className="second-section-container">
          <div className="suggestions-box-pfp">suggestions</div>
        </div>
      )}
      {showUserOptions && (
        <Modal onClose={() => setShowUserOptions(false)}>
          <UserOptionsForm />
        </Modal>
      )}
      <div className="second-and-a-half-section"></div>
      <div className="third-section-container">
        <div className="third-section">
          {userPosts &&
            userPosts.map((post) => {
              let postComments = comments.filter((comment) => {
                return parseInt(comment.post_id) === parseInt(post.id);
              });

              return (
                <a key={post.id} name={post.id} id={post.id}>
                  <PostCardExplore
                    post={post}
                    postComments={postComments}
                    likes={likes}
                  />
                </a>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
