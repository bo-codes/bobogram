import React, { useState } from "react";
import EditCommentForm from "../../CommentForms/EditCommentForm/EditCommentForm";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import moment from "moment";
import { Link } from "react-router-dom";
import "./CommentPostDetail.css";
import { Modal } from "../../../Global/Elements/Modal";
import CommentOptionsForm from "../../../Posts/PostForms/CreatePostForm/CommentOptionsForm";
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal";

function CommentPostDetail({
  comment,
  key,
  post,
  userId,
  setShowConfirmDeleteModal,
  showConfirmDeleteModal,
  commentId
}) {
  const [showEditComment, setShowEditComment] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  // const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const commentDate = comment.created_at.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  return (
    <div className="detail-comment-and-button-container">
      <div className="detail-comment-container-container">
        {showCommentOptions && (
          <Modal onClose={() => setShowCommentOptions(false)}>
            <CommentOptionsForm
              setShowCommentOptions={setShowCommentOptions}
              showCommentOptions={showCommentOptions}
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              commentId={commentId}
            />
          </Modal>
        )}
        {showConfirmDeleteModal && (
          <Modal onClose={() => setShowConfirmDeleteModal(false)}>
            <DeleteCommentModal
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              showConfirmDeleteModal={showConfirmDeleteModal}
              post={post}
              commentId={commentId}
            />
          </Modal>
        )}
        <div className="detail-comment-container">
          {showEditComment ? (
            <EditCommentForm
              post={post}
              comment={comment}
              setShowEditComment={setShowEditComment}
            />
          ) : (
            <div className="detail-comment-username-and-content-container">
              <div className="detail-comment-content">
                <div className="detail-comment-entire-comment">
                  <Link
                    to={`/${post.user.username}`}
                    style={{ textDecoration: "none" }}
                    className="post-detail-username"
                  >
                    <img
                      src={post.user.profile_picture}
                      className="post-detail-comment-user-pfp"
                    />
                  </Link>
                  <Link
                    to={`/${post.user.username}`}
                    className="post-detail-comment-username"
                  >
                    <div
                      className="post-detail-username"
                      style={{ fontSize: "16px" }}
                    >
                      {post.user.username}
                    </div>
                  </Link>
                  <div className="post-detail-comment-comment">
                    {comment.content}
                  </div>
                </div>
                <div className="comment-options-button-container-container">
                  <button
                    className="comment-options-button-container"
                    onClick={() => setShowCommentOptions(true)}
                  >
                    <div className="comment-options-button"></div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentPostDetail;
