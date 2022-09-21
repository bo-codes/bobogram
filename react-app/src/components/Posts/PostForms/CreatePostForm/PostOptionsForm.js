// IMPORT REACT STUFF
import React, { useState } from "react";
// IMPORT COMPONENTS WE'RE USING
import Follows from "../../../Follows/Follows";

import "./PostOptionsForm.css";

function PostOptionsForm({ setShowPostOptions, postUser, setShowPostDetail }) {
  // ---------------------- ON SUBMITTAL ---------------------- vv//
  const featureNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("Darn! This feature is not yet available.");
  };

  const goToPost = (e) => {
    e.preventDefault();
    setShowPostDetail(true);
    setShowPostOptions(false);
  };

  return (
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div className="own-post-options-button">
        <button className="button-text" onClick={featureNotAvailable}>
          <span className="critical-operations">Report</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">
            <Follows profileUsername={postUser.username} />
          </span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text" onClick={featureNotAvailable}>
          Add to favorites
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
          onClick={() => setShowPostOptions(false)}
        >
          Cancel
        </button>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default PostOptionsForm;
