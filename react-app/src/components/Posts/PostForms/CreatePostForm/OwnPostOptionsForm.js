// REACT STUFF
import React from "react";

import "./OwnPostOptionsForm.css";

function OwnPostOptionsForm({
  setShowOwnPostOptions,
  setShowConfirmDeleteModal,
  setShowPostEditModal,
  setShowPostDetail,
}) {
  // FUNCTION TO TOGGLE THE VISIBILITY OF DELETE POST MODAL WHEN A BUTTON IS CLICKED
  const deletePostModal = () => {
    setShowOwnPostOptions(false);
    setShowConfirmDeleteModal(true);
  };

  const editButton = () => {
    setShowOwnPostOptions(false);
    setShowPostEditModal(true);
  };

  const featureNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("Darn! This feature is not yet available.");
  };

  const goToPost = (e) => {
    e.preventDefault();
    setShowPostDetail(true);
    setShowOwnPostOptions(false);
  };

  return (
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations" onClick={deletePostModal}>
            Delete
          </span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span onClick={editButton}>Edit</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text" onClick={featureNotAvailable}>
          Hide like count
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text" onClick={featureNotAvailable}>
          Turn off commenting
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text" onClick={goToPost}>
          Go to post
        </button>
      </div>
      <div className="own-post-options-button">
        <button
          className="button-text"
          onClick={() => setShowOwnPostOptions(false)}
        >
          Cancel
        </button>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default OwnPostOptionsForm;
