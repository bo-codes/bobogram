import React, { useState } from "react";
import EditCommentForm from "../../CommentForms/EditCommentForm/EditCommentForm";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import moment from "moment";
import "./Comment.css";

function Comment({ comment, post, userId }) {
  const [showEditComment, setShowEditComment] = useState(false);
  const commentDate = comment.created_at.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  return (
    <div className="comment-and-button-container">
      <div className="comment-container-container">
        <div className="comment-container">
          {showEditComment ? (
            <EditCommentForm
              post={post}
              comment={comment}
              setShowEditComment={setShowEditComment}
            />
          ) : (
            <div className="comment-username-and-content-container">
              <div className="comment-content">
                <span className="comment-username">
                  {comment.user.username}
                </span>
                {/* {userId === comment.user_id && (
                  <span className="inner-comment-dd">
                    <CommentDropdown
                      comment={comment}
                      setShowEditComment={setShowEditComment}
                      showEditComment={showEditComment}
                    />
                  </span>
                )} */}
              </div>
              <div className="comment-comment">
                <p>{comment.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
