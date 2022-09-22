// REACT STUFF --------
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// IMPORT COMPONENTS WE'RE USING --------
import { ModalWithX } from "../../../Global/Elements/Modal";
import DeleteCommentModal from "../../Elements/DeleteCommentModal/DeleteCommentModal";
// IMPORT THUNKS WE NEED TO DISPATCH --------
import { editComment } from "../../../../store/comments";
import { removeComment } from "../../../../store/comments";

function EditCommentForm({ comment = null, post = null, setShowEditComment }) {
  const [date, setDate] = useState((comment && comment.created_at) || "");
  const [content, setContent] = useState((comment && comment.content) || "");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);

  const postId = post.id;
  let created_at;
  if (comment) created_at = comment.created_at;

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create or edit a comment."]);
      setErrors(comment);
      return;
    }

    comment = await dispatch(
      editComment(comment.id, userId, postId, content, date)
    );

    if (Array.isArray(comment)) {
      setErrors(comment);
    } else {
      setShowEditComment(false);
      return;
    }
  };
  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment.id));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <ul>
            {errors &&
              errors.map((error) => {
                let splitError = error.split(":");
                return (
                  <li
                    key={error}
                    style={{
                      color: "white",
                    }}
                  >
                    {splitError[1]}
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "fit-content",
            }}
          />
        </div>
        <div>
          {comment ? (
            <div
              style={{
                marginTop: "4px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  width: "48%",
                  color: "white",
                }}
                type="submit"
              >
                Update
              </button>
              <button
                style={{
                  width: "48%",
                  color: "white",
                }}
                type="button"
                onClick={deleteComment}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <button>Create Comment</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditCommentForm;
