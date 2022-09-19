// IMPORT REACT STUFF --------
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
// --------COMPONENTS -------- //
import Comment from "../../../Comment/Elements/Comment/Comment";
import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";
// --------FORMS -------- //
import LoginFormPosts from "../../../auth/LoginFormCreatePost/LoginFormCreatePost";
import CreateCommentForm from "../../../Comment/CommentForms/CreateCommentForm/CreateCommentForm";
import EditPostForm from "../../PostForms/CreatePostForm/EditPostForm"
// -------- CSS/IMAGES -------- //
import "./Postcard.css";
import Like from "../../../Like/Like";
import OwnPostOptionsForm from "../../PostForms/CreatePostForm/OwnPostOptionsForm";
import { Modal } from "../../../Global/Elements/Modal";
import PostOptionsForm from "../../PostForms/CreatePostForm/PostOptionsForm";
import PostCardDetail from "../PostCardDetail/PostCardDetail";

function PostCard({ post, postComments, likes }) {
  // console.log("POST LIKES BEFORE EVEN RETURNING", likes);
  const dispatch = useDispatch();
  // -------- SETTING STATES ------- //
  // SHOWING OR HIDING THE EDIT POST MODAL
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showOwnPostOptions, setShowOwnPostOptions] = useState(false);
  const [showPostEditModal, setShowPostEditModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);

  // SHOWING OR HIDING THE CREATE COMMENT MODAL
  const [showCreateComment, setShowCreateComment] = useState(false);

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // -------- PULLING INFO FROM THE STATE -------- //
  // const likes = useSelector((state) => state.likes) || ""; //Grab likes state
  const user = useSelector((state) => state.session.user) || "";
  const [localDate] = useState(new Date(post.created_at));
  const postLikes = likes.filter((like) => like.post_id == post.id);
  const remainingComments = postComments.slice(-2)

  const areWeShowingComments = () => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };

  return (
    <div id="outermost-card">
      {/* {console.log("POST LIKES IN POSTCARD.JS BEFORE RETURN", likes)} */}
      <div className="post-head-container">
        <div className="post-username">
          <Link
            to={`/${post.user.username}`}
            style={{ textDecoration: "none", color: "black" }}
            className="post-username"
          >
            <img className="post-pfp" src={post.user.profile_picture} />
            <div className="post-username-name">{post.user.username}</div>
          </Link>
          {/* {user && <Follows profileUsername={post.user.username} />} */}
        </div>
        {/* ------ POST EDIT BUTTON ------ vv*/}
        <div className="edit-post-container">
          {post ? (
            // POST EDIT BUTTON
            // when clicked, setShowPostOptions will toggle to true
            <div className="edit-post-button-container">
              {user && post.user_id === user.id && (
                <button
                  onClick={() => setShowOwnPostOptions(true)}
                  className="edit-post-button"
                >
                  ...
                </button>
              )}
              {user && !(post.user_id === user.id) && (
                <button
                  onClick={() => setShowPostOptions(true)}
                  className="edit-post-button"
                >
                  ...
                </button>
              )}
              {/* if setShowPostOptions is set to true, then show the modal which holds the post edit form. */}
            </div>
          ) : (
            <h1>Loading Post</h1>
          )}
        </div>
        {/* ------ POST EDIT BUTTON ------ ^^*/}
      </div>
      {/* ----------- POST IMAGE ----------- vv*/}
      <div>
        {post.image_url && (
          <img id="postcard-image" src={post.image_url} alt="" />
        )}
        {/* ----------- POST DETAIL POPUP ----------- vv*/}
        {showPostDetail && (
          <Modal onClose={() => setShowPostDetail(false)}>
            <PostCardDetail
              post={post}
              showPostDetail={showPostDetail}
              setShowPostDetail={setShowPostDetail}
              postLikes={postLikes}
            />
          </Modal>
        )}
        {/* ----------- POST DETAIL POPUP ----------- ^^*/}
        {/* ----------- EDIT POST BUTTON ----------- vv*/}
        <div id="post-form-container">
          {showPostOptions && (
            <Modal onClose={() => setShowPostOptions(false)}>
              <PostOptionsForm
                post={post}
                setShowPostOptions={setShowPostOptions}
                setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              />
            </Modal>
          )}
          {showOwnPostOptions && (
            <Modal onClose={() => setShowOwnPostOptions(false)}>
              <OwnPostOptionsForm
                post={post}
                setShowOwnPostOptions={setShowOwnPostOptions}
                showOwnPostOptions={showOwnPostOptions}
                setShowPostEditModal={setShowPostEditModal}
                setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              />
            </Modal>
          )}
          {showConfirmDeleteModal && (
            <Modal onClose={() => setShowConfirmDeleteModal(false)}>
              <DeletePostModal
                setShowConfirmDeleteModal={setShowConfirmDeleteModal}
                showConfirmDeleteModal={showConfirmDeleteModal}
                post={post}
              />
            </Modal>
          )}
          {/* ----------- EDIT POST MODAL ----------- vv*/}
          {showPostEditModal && (
            <Modal onClose={() => setShowPostEditModal(false)}>
              <EditPostForm
                post={post}
                setShowPostEditModal={setShowPostEditModal}
                showPostEditModal={showPostEditModal}
                setShowConfirmDeleteModal={setShowConfirmDeleteModal}
                showConfirmDeleteModal={showConfirmDeleteModal}
              />
            </Modal>
          )}
          {/* ----------- EDIT POST MODAL ----------- ^^*/}
        </div>
        {/* ----------- EDIT POST BUTTON ----------- ^^*/}
      </div>
      {/* ----------- POST IMAGE ----------- ^^*/}
      <div className="comment-btns">
        {user ? (
          <Like post_id={post.id} user_id={user.id} likes={likes} postLikes={postLikes} />
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
      <div className="username-caption-container">
        <Link
          to={`/${post.user.username}`}
          style={{ textDecoration: "none", color: "black" }}
          className="post-username-2"
        >
          <p>{post.user.username}</p>
        </Link>
        {/* {user && <Follows profileUsername={post.user.username} />} */}
        {/*  POST CAPTION ----- vv*/}
        {post.caption.length > 138 && !showFullCaption && (
          <p className="post-caption">
            {post.caption.slice(0, 138)}{" "}
            <span>
              ...
              <button
                className="show-more"
                onClick={() => setShowFullCaption(true)}
              >
                more
              </button>
            </span>
          </p>
        )}
        {post.caption.length > 138 && showFullCaption && (
          <p className="post-caption">
            {post.caption}{" "}
            <span>
              <button
                className="show-more"
                onClick={() => setShowFullCaption(false)}
              >
                less
              </button>
            </span>
          </p>
        )}
        {post.caption.length < 138 && (
          <p className="post-caption">{post.caption}</p>
        )}
        {/* POST CAPTION ----- ^^*/}
      </div>
      {/* {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginFormPosts setShowLogin={setShowLogin} />
        </Modal>
      )} */}
      <div className="create-comment-container">
        {/* ------------ COMMENTS ------------ vv*/}
        {showAllComments ? (
          <div className="comment-section">
            {postComments.map((comment) => {
              // FOR EACH COMMENT DISPLAY THIS
              return (
                <Comment
                  className="comment"
                  key={comment.id}
                  comment={comment}
                  post={post}
                  userId={user.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="comment-section">
            {postComments.length > 2 ? (
              <>
                <button
                  onClick={() => {
                    setShowAllComments(!showAllComments);
                  }}
                  className="view-comments"
                >
                  {`View all ${postComments.length} comments`}
                </button>
                <div>
                  {remainingComments.map((comment) => {
                    // FOR EACH COMMENT DISPLAY THIS
                    return (
                      <Comment
                        className="comment"
                        key={comment.id}
                        comment={comment}
                        post={post}
                        userId={user.id}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              postComments.map((comment) => {
                // FOR EACH COMMENT DISPLAY THIS
                return (
                  <Comment
                    className="comment"
                    key={comment.id}
                    comment={comment}
                    post={post}
                    userId={user.id}
                  />
                );
              })
            )}
          </div>
        )}
        {/* ------------ COMMENTS ------------ ^^*/}
        {/* ----- POST DATE ----- vv*/}
        <div className="post-date">
          <div>{moment(localDate).calendar().toUpperCase()}</div>
        </div>
        {/* ----- POST DATE ----- ^^ */}
        {/* ----------- CREATE COMMENT FORM ----------- vv*/}
        <CreateCommentForm
          post={post}
          setShowCreateComment={setShowCreateComment}
          userId={user.id}
          setShowLogin={setShowLogin}
        />
        {/* ----------- CREATE COMMENT FORM ----------- ^^*/}
      </div>
    </div>
  );
}

export default PostCard;
