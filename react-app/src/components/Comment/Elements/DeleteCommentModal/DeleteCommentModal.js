import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { removeComment } from "../../../../store/comments";

const DeleteCommentModal = ({ comment, setShowConfirmDeleteCommentModal, setShowCommentEditModal, commentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const cancelDelete = () => {
    setShowConfirmDeleteCommentModal(false);
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(commentId));
  };

  return (
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div id="delete-modal-header">
        <div id="delete-post-text">Delete comment?</div>
        <div id="are-you-sure-text">
          Are you sure you want to delete this comment?
        </div>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span
            className="critical-operations delete-button-delete-modal"
            onClick={deleteComment}
          >
            Delete
          </span>
        </button>
      </div>
      <div className="own-post-options-bottom-button">
        <button className="button-text" onClick={cancelDelete}>
          Cancel
        </button>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
};

export default DeleteCommentModal;
