// IMPORT REACT STUFF --------
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";
import { Link } from "react-router-dom";

import PostCardDetail from "../PostCardDetail/PostCardDetail";

// -------- CSS/IMAGES -------- //
import "./PostcardExplore.css";

function PostCardExplore({ post, likes }) {

  const user = useSelector((state) => state.session.user) || "";

  const [showPostDetail, setShowPostDetail] = useState(false);

  const showDetails = (e) => {
    e.preventDefault()
    setShowPostDetail(true)
  }

  const postLikes = likes.filter((like) => like.post_id == post.id);

  return (
    <div
      className="postcard-explore"
      style={{
        width: "291px",
      }}
    >
      {/* ----------- POST IMAGE ----------- vv*/}
      <button
        style={{
          textDecoration: "none",
          width: "295px",
        }}
        onClick={showDetails}
      >
        {post.image_url && (
          <div
            className="postcard-image"
            style={{
              backgroundImage: `url(${post.image_url})`,
            }}
          ></div>
        )}
      </button>
      {/* ----------- POST IMAGE ----------- ^^*/}
      {showPostDetail && (
        <Modal onClose={() => setShowPostDetail(false)}>
          <PostCardDetail
            post={post}
            showPostDetail={showPostDetail}
            setShowPostDetail={setShowPostDetail}
            postLikes={postLikes}
          />
        </Modal>
      )}
    </div>
  );
}
export default PostCardExplore;
