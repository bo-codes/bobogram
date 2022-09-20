import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removePost } from "../../../../store/posts";

import './DeletePostModal.css'

const DeletePostModal = ({ post, setShowConfirmDeleteModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cancelDelete = () => {
    setShowConfirmDeleteModal(false);
  };

  const deletePost = async (e) => {
    e.preventDefault();
    await dispatch(removePost(post.id));
    history.push(`${window.location.pathname}`);
  };

  return (
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div id="delete-modal-header">
        <div id="delete-post-text">Delete post?</div>
        <div id="are-you-sure-text">
          Are you sure you want to delete this post?
        </div>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span
            className="critical-operations delete-button-delete-modal"
            onClick={deletePost}
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

export default DeletePostModal;
