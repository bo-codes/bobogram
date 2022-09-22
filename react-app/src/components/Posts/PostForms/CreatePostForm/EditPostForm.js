// REACT STUFF
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING
import { Modal } from "../../../Global/Elements/Modal";
import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";
// IMPORT THUNKS WE NEED TO DISPATCH
import { makePost, editPost } from "../../../../store/posts";

import "./EditPostForm.css";

function EditPostForm({
  post = null,
  setShowPostEditModal,
  setShowConfirmDeleteModal,
  showConfirmDeleteModal,
}) {
  // SETTING STATES
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);
  const user = useSelector((state) => state.session.user);

  // ---------------------- ON SUBMITTAL ---------------------- vv//
  const submit = async (e) => {
    e.preventDefault();

    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create or edit an post."]);
      setErrors(post);
      return;
    }

    setImageLoading(true);
    setDate(date);

    if (!post) {
      post = await dispatch(makePost(userId, image, caption, date));

      if (post.id) {
        history.push(window.location.pathname);
        return;
      }
    } else {
      post = await dispatch(
        editPost(post.id, userId, image, caption, date.replace("T", " "))
      );
    }

    setImageLoading(false);

    if (Array.isArray(post)) {
      setErrors(post);
    } else {
      setShowPostEditModal(false);
      return;
    }
  };
  // ---------------------- ON SUBMITTAL ---------------------- ^^//

  return (
    <div id="edit-post-form-container">
      {/* ----------------------FORM ---------------------- vv*/}
      <form onSubmit={submit}>
        {/* -------- ERROR DISPLAY -------- vv*/}
        <div>
          <ul>
            {errors &&
              errors.map((error) => {
                let splitError = error.split(":");
                let firstPart = splitError[0];
                let firstLetter = firstPart[0].toUpperCase();
                let secondPart = splitError[1].slice(11, 23);
                return (
                  <li key={error}>
                    {firstLetter + firstPart.slice(1) + secondPart}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* -------- ERROR DISPLAY -------- ^^*/}
        <div className="entire-edit-form">
          <div className="edit-form-header">
            <div className="edit-form-header-button">
              <button
                className="edit-form-cancel-button"
                onClick={() => setShowPostEditModal(false)}
              >
                Cancel
              </button>
            </div>
            <div className="post-edit-form-title">Edit info</div>
            <div className="edit-form-header-button">
              <button className="edit-form-done-button" onClick={submit}>
                Done
              </button>
            </div>
          </div>
          <div className="edit-post-form">
            <div
              className="edit-post-image"
              style={{
                backgroundImage: `url(${post.image_url})`,
              }}
            ></div>
            {/* ----- CAPTION INPUT ----- vv*/}
            <div className="input-section-caption">
              <div className="username-create-post-bar">
                <img
                  src={user.profile_picture}
                  className="user-pfp-create-post"
                />
                <label htmlFor="caption" className="caption-label">
                  {user.username}
                </label>
              </div>
              <textarea
                name="caption"
                type="text"
                value={caption}
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
                className="caption-input"
              />
            </div>
            {/* ----- CAPTION INPUT ----- ^^*/}
          </div>
        </div>
        {showConfirmDeleteModal && (
          <Modal onClose={() => setShowConfirmDeleteModal(false)}>
            <DeletePostModal
              setShowConfirmDeleteModal={setShowConfirmDeleteModal}
              post={post}
            />
          </Modal>
        )}
      </form>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default EditPostForm;
