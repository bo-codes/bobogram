// IMPORT REACT STUFF --------
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";
import moment from "moment";
import { Link } from "react-router-dom";
// --------COMPONENTS -------- //
import Comment from "../../../Comment/Elements/Comment/Comment";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import Follows from "../../../Follows/Follows";
// --------FORMS -------- //
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import CreateCommentForm from "../../../Comment/CommentForms/CreateCommentForm/CreateCommentForm";
import EditPostForm from "../../PostForms/CreatePostForm/OwnPostOptionsForm";
import SignUpForm from "../../../auth/SignupForm/SignUpForm";
// -------- CSS/IMAGES -------- //
import "./PostCardDetail.css";
import { addOneLike, getAllLikes } from "../../../../store/likes";
import Like from "../../../Like/Like";
import CommentPostDetail from "../../../Comment/Elements/CommentPostDetail/CommentPostDetail";
import DeleteCommentModal from "../../../Comment/Elements/DeleteCommentModal/DeleteCommentModal";

function PostCardDetail({ post, postComments=null, postLikes, likes }) {
  // console.log("POST LIKES BEFORE EVEN RETURNING", likes);
  const dispatch = useDispatch();
  // -------- SETTING STATES ------- //
  // SHOWING OR HIDING THE EDIT POST MODAL
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // SHOWING OR HIDING THE CREATE COMMENT MODAL


  const [showLogin, setShowLogin] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  // const likes = useSelector((state) => state.likes) || ""; //Grab likes state
  const user = useSelector((state) => state.session.user) || "";

    const areWeShowingComments = () => {
      if (showComments) {
        setShowComments(false);
      } else {
        setShowComments(true);
      }
    };


  return (
    <div id="post-detail-outermost-card">
      {/* ----------- POST IMAGE ----------- vv*/}
      {post.image_url && (
        <div id="post-detail-postcard-image-container">
          <div
            id="post-detail-postcard-image"
            style={{ backgroundImage: `url(${post.image_url})` }}
          ></div>
        </div>
      )}
      {/* ----------- POST IMAGE ----------- ^^*/}

      {/* ----- POST DATE ----- vv*/}
      {/* <div className="post-date">
        <div>{moment(localDate).calendar()}</div>
      </div> */}
      {/* ----- POST DATE ----- ^^ */}

      {/*  POST CAPTION ----- vv*/}
      <div id="post-detail-second-section">
        <div className="post-head-container">
          <div className="post-username">
            <Link
              to={`/${post.user.username}`}
              style={{ textDecoration: "none" }}
              className="post-detail-user-pfp-container"
            >
              <img
                src={user.profile_picture}
                className="post-detail-user-pfp"
              />
            </Link>
            <Link
              to={`/${post.user.username}`}
              className="post-detail-username"
            >
              <div className="post-username" style={{ fontSize: "15px" }}>
                {post.user.username}
              </div>
            </Link>
            {user && (
              <Follows
                profileUsername={post.user.username}
                className="post-detail-follows"
              />
            )}
          </div>
          {/* ------ POST EDIT BUTTON ------ vv*/}
          <div className="edit-post-container">
            {post ? (
              // POST EDIT BUTTON
              // when clicked, setShowCreatePost will toggle to true
              <div className="edit-post-button-container">
                {user && post.user_id === user.id && (
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="edit-post-button"
                    style={{ visibility: "hidden" }}
                  >
                    ...
                  </button>
                )}
                {/* if setShowCreatePost is set to true, then show the modal which holds the post edit form. */}
              </div>
            ) : (
              <h1>Loading Post</h1>
            )}
          </div>
          {/* ------ POST EDIT BUTTON ------ ^^*/}
        </div>
        <div className="post-detail-caption-and-comments">
          {!showCreatePost && <p id="post-detail-caption">{post.caption}</p>}
          {/* POST CAPTION ----- ^^*/}
          {/* ------------ COMMENTS ------------ vv*/}
          <div className="comment-section-container">
            <div className="postcard-detail-comment-section">
              {postComments &&
                postComments
                  .sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                  })
                  .map((comment) => {
                    // FOR EACH COMMENT DISPLAY THIS
                    return (
                      <CommentPostDetail
                        style={{
                          backgroundColor: "red",
                        }}
                        className="post-detail-comment"
                        key={comment.id}
                        commentId={comment.id}
                        comment={comment}
                        post={post}
                        userId={user.id}
                        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
                        showConfirmDeleteModal={showConfirmDeleteModal}

                      />
                    );
                  })}
            </div>
          </div>
          {/* ------------ COMMENTS ------------ ^^*/}
        </div>
        <div className="post-detail-postcard-pinned-to-bottom-section">
          <div className="comment-btns">
            {user ? (
              <Like
                post_id={post.id}
                user_id={user.id}
                likes={likes}
                postLikes={postLikes}
              />
            ) : (
              <button className="post-btns" onClick={() => setShowLogin(true)}>
                <div id="heart-btn"></div>
              </button>
            )}
            <button className="post-btns" onClick={areWeShowingComments}>
              <div id="comment-btn"></div>
            </button>
          </div>
          {/* LIKES */}
          {postLikes.length >= 1 && (
            <div className="like-count">
              {postLikes.length == 1
                ? `${postLikes.length} like`
                : `${postLikes.length} likes`}
            </div>
          )}
          {/* {showLogin && (
            <Modal onClose={() => setShowLogin(false)}>
              <LoginFormPosts setShowLogin={setShowLogin} />
            </Modal>
          )} */}
          <div className="create-comment-container">
            {/* ----------- CREATE COMMENT FORM ----------- vv*/}
            <CreateCommentForm
              post={post}
              userId={user.id}
              setShowLogin={setShowLogin}
            />
            {/* ----------- CREATE COMMENT FORM ----------- ^^*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCardDetail;
