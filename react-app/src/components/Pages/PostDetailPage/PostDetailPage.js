// REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { thunkGetOnePost } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
import PostCardDetail from "../../Posts/Elements/PostCardDetail/PostCardDetail";
// -------- CSS/IMAGES -------- //

function PostDetailPage({}) {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const users = useSelector((state) => Object.values(state.user));
  const likes = Object.values(useSelector((state) => state.likes));

  useEffect(() => {
    const path = window.location.pathname.slice(7);
    dispatch(thunkGetOnePost(parseInt(path)));
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
                <PostCardDetail
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

export default PostDetailPage;
