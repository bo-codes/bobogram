// IMPORT REACT STUFF
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
// IMPORT COMPONENTS WE'RE USING
import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";
// IMPORT THUNKS WE NEED TO DISPATCH
import { makePost, editPost } from "../../../../store/posts";

import "./UserOptionsForm.css";

// THIS IS OUR POST CREATION/EDIT FORM COMPONENT
function UserOptionsForm({
  post = null,
  setShowCreatePost,
  setShowConfirmDeleteModal,
}) {
  // SETTING STATES
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  // const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // SETTING UP THE useHistory AND useDispatch FUNCTIONS
  const history = useHistory();
  const dispatch = useDispatch();

  // PULLING THE CURRENT USER IN OUR STATE
  const userId = useSelector((state) => state.session.user.id);

  // ---------------------- ON SUBMITTAL ---------------------- ^^//
  return (
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Block</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Restrict</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Report</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Embed</button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">About this account</button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Cancel</button>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default UserOptionsForm;
