import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../../store/comments";
import "../../Elements/Comment/Comment.css";
import "./CommentDropdown.css";

function CommentDropdown({ setShowEditComment, showEditComment, comment }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();

  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment.id));
  };

  useEffect(() => {
    const clickCheck = (e) => {
      if (e.target.classList.contains("comment-menu-button")) return;
      if (!e.target.classList.contains("dropdown")) setShowDropdown(false);
    };
    document.addEventListener("mousedown", clickCheck);
    return () => document.removeEventListener("mousedown", clickCheck);
  }, [showDropdown]);

  return (
    <>
      <div style={{ position: "relative", zIndex: "1" }}>
        <button
          className="comment-dropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          ...
        </button>
        {showDropdown && !showEditComment && (
          <div
            style={{ position: "absolute", backgroundColor: "grey" }}
            className="dropdown"
          >
            <button
              style={{
                color: "white",
              }}
              className="comment-menu-button"
              onClick={() => setShowEditComment(true)}
            >
              Edit
            </button>
            <button
              style={{
                color: "white",
              }}
              type="button"
              className="comment-menu-button"
              onClick={deleteComment}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CommentDropdown;
