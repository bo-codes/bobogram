// REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
// -------- CSS/IMAGES -------- //
import "./Posts.css";

function Posts({}) {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  const shuffledUsers = users.sort(() => Math.random() - 0.5);

  useEffect(() => {
    dispatch(getAllPostsThunk());
    dispatch(getAllCommentsThunk());
    dispatch(getAllLikes());
  }, [dispatch]);

  return (
    <main>
      <div className="post-list">
        <div className="suggested-users"></div>
        {posts &&
          posts.map((post) => {
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
    </main>
  );
}

export default Posts;
