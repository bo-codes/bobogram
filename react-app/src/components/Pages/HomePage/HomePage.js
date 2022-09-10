// IMPORT REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk, thunkGetFeedPosts } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
import { thunkGetAllUsers, thunkGetUser } from "../../../store/users";
// -------- CSS/IMAGES -------- //
import './HomePage.css'

function HomePage({}) {
  const dispatch = useDispatch();
  // PULLING ALL OF THE INFORMATION FROM OUR STATE
  // THIS RUNS FIRST BEFORE USEEFFECT FETCHES OUR DATA WHICH IS WHY WE ALWAYS HAVE TO IMPLEMENT
  // OUR CONDITIONALS (posts && posts.map()) TO HANDLE THE CASES WHERE WE DONT HAVE DATA YET
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  // WE ADD DISPATCH TO THE DEPENDENCY ARR SO THAT IT DOESNT RERENDER A MILLION TIMES, I JUST CANT EXPLAIN IT WELL
  useEffect(() => {
    // console.log(likes);
    // GET ALL POSTS
    dispatch(thunkGetFeedPosts());
    // GET ALL COMMENTS
    dispatch(getAllCommentsThunk());
    // GET ALL LIKES
    dispatch(getAllLikes());
    dispatch(thunkGetAllUsers())
  }, [dispatch]);

  return (
    <main className="entire-homepage">
      <div className="homepage-container">
        {/* <div className="suggested-users-container"> */}
        <div className="suggested-users-container">
          <div className="inner-suggestions-container">
            <div className="current-user-bar">
              <Link to={`/${user.username}`} exact={true}>
                <img
                  className="current-user-profile-picture"
                  src={user.profile_picture}
                />
              </Link>
              <div className="current-user-username-and-name">
                <Link to={`/${user.username}`} exact={true} style={{textDecoration: 'none', color: 'black'}}>
                  <h3 className="current-user-username">{user.username}</h3>
                </Link>
                <h3 className="current-user-full-name">{user.full_name}</h3>
              </div>
            </div>
            <h2 className="suggestions-for-you-title">
              Suggestestions For You
            </h2>
            {users.slice(0, 5).map((user) => {
              return (
                <div key={user.id}>
                  <NavLink to={`/${user.username}`}>
                    <img src={user.profile_picture}></img>
                    <div>{user.username}</div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        {/* </div> */}
        {/* <div className="post-list-container"> */}
        <div className="post-list">
          {/* CHECK IF THERE ARE POSTS SO THAT THE USESELECTOR DOESNT MESS US UP */}
          {posts &&
            posts
              .sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
              })
              .map((post) => {
                // WE FILTER THROUGH ALL COMMENTS EVER TO ONLY GRAB THE ONES ASSOCIATED WITH THIS POST
                // console.log(likes, "LIKES BEFORE EVEN FILTERING");
                let postComments = comments.filter((comment) => {
                  return parseInt(comment.post_id) === parseInt(post.id);
                });

                // RETURNING A POST CARD WHICH IS A COMPONENT THAT DETERMINES HOW THE POST IS STRUCTURED
                return (
                  // EACH ITEM IN A MAP NEEDS ITS OWN UNIQUE KEY
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
    </main>
  );
}

export default HomePage;
