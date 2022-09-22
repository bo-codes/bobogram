// REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// --------COMPONENTS -------- //
import PostCardExplore from "../../Posts/Elements/PostCard/PostCardExplore";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
// -------- CSS/IMAGES -------- //
import "./ExplorePage.css";

function ExplorePage({}) {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  let nonUserPosts;
  if (user) {
    nonUserPosts = posts.filter((post) => post.user_id !== user.id);
  } else {
    nonUserPosts = posts;
  }

  useEffect(() => {
    dispatch(getAllPostsThunk());
    dispatch(getAllCommentsThunk());
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
                  style={{ position: "relative", width: "295px" }}
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
