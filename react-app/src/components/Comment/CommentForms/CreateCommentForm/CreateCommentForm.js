// -------- REACT --------
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

// -------- THUNKS --------
import { makeComment } from "../../../../store/comments";
import "./CreateCommentForm.css";

function CreateCommentForm({
  comment = null,
  post = null,
  userId,
}) {
  const [date, setDate] = useState((comment && comment.created_at) || "");
  const [content, setContent] = useState((comment && comment.content) || "");
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();


  const postId = post.id;
  let created_at;
  if (comment) created_at = comment.created_at;

  // -------- ONSUBMIT -------- vv//
  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(comment);
      return;
    }

    comment = await dispatch(makeComment(userId, postId, content, date));
    if (comment.id) {
      setContent("");
      history.push(window.location.pathname);
      return;
    }

    if (Array.isArray(comment)) {
      setErrors(comment);
    } else {
      setContent("");
      return;
    }
  };

  return (
    <div className="comment-create-input">
      <form onSubmit={submit}>
        <div>
          <ul>
            {errors &&
              errors.map((error) => {
                let splitError = error.split(":");
                return <li key={error}>{splitError[1]}</li>;
              })}
          </ul>
        </div>
        <div className="custom-search">
          <div className="text-area-container">
            <TextareaAutosize
              className="custom-search-input"
              name="content"
              type="text"
              value={content}
              placeholder="Add a comment..."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {userId && content ? (
            <button className="custom-search-button">Post</button>
          ) : (
            <button className="custom-search-button-disabled" disabled>
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
