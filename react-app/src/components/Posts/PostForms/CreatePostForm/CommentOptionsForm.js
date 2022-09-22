import React from "react";

import "./CommentOptionsForm.css";;

function CommentOptionsForm({
  setShowConfirmDeleteCommentModal,
  setShowCommentOptions,

}) {


  const deletePostModal = () => {
    setShowConfirmDeleteCommentModal(true);
    setShowCommentOptions(false)
  };

  const featureNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("Darn! This feature is not yet available.");
  };

  return (
    <div id="own-post-options">
      <div className="own-post-options-button">
        <button className="button-text" onClick={featureNotAvailable}>
          <span className="critical-operations">Report</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text" onClick={deletePostModal}>
          <span className="critical-operations">Delete</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button
          className="button-text"
          onClick={() => setShowCommentOptions(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CommentOptionsForm;
