// IMPORT REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
// -------- CSS/IMAGES -------- //
import "./ExplorePage.css";
import PostCardExplore from "../../Posts/Elements/PostCard/PostCardExplore";

function ExplorePage({}) {
  const dispatch = useDispatch();
  // PULLING ALL OF THE INFORMATION FROM OUR STATE
  // THIS RUNS FIRST BEFORE USEEFFECT FETCHES OUR DATA WHICH IS WHY WE ALWAYS HAVE TO IMPLEMENT
  // OUR CONDITIONALS (posts && posts.map()) TO HANDLE THE CASES WHERE WE DONT HAVE DATA YET
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  let nonUserPosts
  if (user) {
    nonUserPosts = posts.filter(post => post.user_id !== user.id)
  } else {
    nonUserPosts = posts
  }
  const shuffledUsers = users.sort(() => Math.random() - 0.5);
  // const orderedPosts = posts.sort(function compareDates(a, b) {
  //   return a.id - b.id;
  // });

  // WE ADD DISPATCH TO THE DEPENDENCY ARR SO THAT IT DOESNT RERENDER A MILLION TIMES, I JUST CANT EXPLAIN IT WELL
  useEffect(() => {
    // console.log(likes);
    // GET ALL POSTS
    dispatch(getAllPostsThunk());
    // GET ALL COMMENTS
    dispatch(getAllCommentsThunk());
    // GET ALL LIKES
    dispatch(getAllLikes());
  }, [dispatch]);

  return (
    <main>
      <div className="page-container">
        <div className="images-container">
          {nonUserPosts.map((post) => {
            let postComments = comments.filter((comment) => {
              return parseInt(comment.post_id) === parseInt(post.id);
            });
            return (
              <div key={post.id} style={{ alignContent: "center" }}>
                <PostCardExplore
                  id="image"
                  style={{ position: "relative", width: '295px' }}
                  post={post}
                  postComments={postComments}
                  likes={likes}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default ExplorePage;
