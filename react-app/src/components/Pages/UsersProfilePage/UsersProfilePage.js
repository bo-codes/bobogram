// REACT STUFF --------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// --------COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// -------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getOneUserPostsThunk } from "../../../store/posts";
import { getAllLikes } from "../../../store/likes";
// -------- CSS/IMAGES -------- //
import "./UsersProfilePage.css";

function UsersProfilePage() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);
  const likes = Object.values(useSelector((state) => state.likes));

  let userPosts;
  if (user) {
    userPosts = posts.filter((post) => post.user_id === user.id);
  }

  useEffect(() => {
    dispatch(getOneUserPostsThunk(window.location.pathname.slice(7)));
    dispatch(getAllCommentsThunk());
    dispatch(getAllLikes());
  }, [dispatch, user]);

  return (
    <main>
      <div className="users-name">{window.location.pathname.slice(7)}</div>
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

export default UsersProfilePage;
