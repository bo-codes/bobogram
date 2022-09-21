import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";

import { makePost, editPost } from "../../../../store/posts";

import "./CommentOptionsForm.css";
import Follows from "../../../Follows/Follows";

function CommentOptionsForm({
  post = null,
  setShowCreatePost,
  setShowConfirmDeleteCommentModal,
  setShowCommentOptions,
  showConfirmDeleteModal,
  setShowPostOptions,
  postUser,
  setShowPostDetail,
  setShowDeletePostModal,
  comment,
  commentId,
}) {
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);

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
      setShowCreatePost(false);
      return;
    }
  };

  const updateImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const deletePostModal = () => {
    setShowConfirmDeleteCommentModal(true);
    setShowCommentOptions(false)
  };

  const pageNotAvailable = (e) => {
    e.preventDefault();
    return window.alert("This page is not yet available, try the other pages!");
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
