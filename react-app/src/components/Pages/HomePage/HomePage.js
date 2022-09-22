// REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
import Follows from "../../Follows/Follows";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { thunkGetFeedPosts } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
import { thunkGetAllUsers } from "../../../store/users";
// -------- CSS/IMAGES -------- //
import "./HomePage.css";

function HomePage({}) {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  useEffect(() => {
    dispatch(thunkGetFeedPosts());
    dispatch(getAllCommentsThunk());
    dispatch(getAllLikes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkGetAllUsers());
  }, [dispatch]);

  return (
    <main className="entire-homepage">
      {posts.length ? (
        <div className="homepage-container">
          <div className="suggested-users-container">
            <div className="inner-suggestions-container">
              <div className="current-user-bar">
                {user && (
                  <>
                    <Link to={`/${user.username}`} exact={true}>
                      <img
                        className="current-user-profile-picture"
                        src={user.profile_picture}
                      />
                    </Link>
                    <div className="current-user-username-and-name">
                      <Link
                        to={`/${user.username}`}
                        exact={true}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <h3 className="current-user-username">
                          {user.username}
                        </h3>
                      </Link>
                      <h3 className="current-user-full-name">
                        {user.full_name}
                      </h3>
                    </div>
                    <Link
                      to={{
                        pathname: "https://www.bo-codes.co",
                      }}
                      target="_blank"
                      className="other-work-text"
                    >
                      Other Work
                    </Link>
                  </>
                )}
              </div>
              <h2 className="suggestions-for-you-title">
                Suggestestions For You
              </h2>
              {shuffledUsers &&
                shuffledUsers.slice(0, 5).map((user) => {
                  return (
                    <div className="user-bar" key={user.id}>
                      <Link to={`/${user.username}`} exact={true}>
                        <img
                          className="user-profile-picture"
                          src={user.profile_picture}
                        />
                      </Link>
                      <div className="user-username-and-name">
                        <Link
                          to={`/${user.username}`}
                          exact={true}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <h3 className="user-username">{user.username}</h3>
                        </Link>
                        <h3 className="user-suggested-for-you">
                          Suggested for you
                        </h3>
                      </div>
                      <Follows
                        profileUsername={user.username}
                        className="user-follow-button"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="post-list">
            {posts &&
              posts
                .sort((a, b) => {
                  return new Date(b.created_at) - new Date(a.created_at);
                })
                .map((post) => {
                  let postComments = comments.filter((comment) => {
                    return parseInt(comment.post_id) === parseInt(post.id);
                  });

                  return (
                    <a key={post.id} name={post.id} id={post.id}>
                      <PostCard
                        post={post}
                        postComments={postComments}
                        likes={likes}
                      />
                    </a>
                  );
                })}
          </div>
          {/* </div> */}
        </div>
      ) : (
        <div className="suggested-users-only-container">
          <div className="inner-suggestions-only-container">
            <div className="current-user-bar">
              {user && (
                <>
                  <Link to={`/${user.username}`} exact={true}>
                    <img
                      className="current-user-profile-picture"
                      src={user.profile_picture}
                    />
                  </Link>
                  <div className="current-user-username-and-name">
                    <Link
                      to={`/${user.username}`}
                      exact={true}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h3 className="current-user-username">{user.username}</h3>
                    </Link>
                    <h3 className="current-user-full-name">{user.full_name}</h3>
                  </div>
                  <Link
                    to={{
                      pathname: "https://www.bo-codes.co",
                    }}
                    target="_blank"
                    className="other-work-text"
                  >
                    Other Work
                  </Link>
                </>
              )}
            </div>
            <h2 className="suggestions-for-you-title">
              Suggestestions For You
            </h2>
            {shuffledUsers &&
              shuffledUsers.slice(0, 31).map((user) => {
                return (
                  <div className="user-bar" key={user.id}>
                    <Link to={`/${user.username}`} exact={true}>
                      <img
                        className="user-profile-picture"
                        src={user.profile_picture}
                      />
                    </Link>
                    <div className="user-username-and-name">
                      <Link
                        to={`/${user.username}`}
                        exact={true}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <h3 className="user-username">{user.username}</h3>
                      </Link>
                      <h3 className="user-suggested-for-you">
                        Suggested for you
                      </h3>
                    </div>
                    <Follows
                      profileUsername={user.username}
                      className="user-follow-button"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </main>
  );
}

export default HomePage;
