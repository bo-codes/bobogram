// REACT STUFF --------
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";

import PostCardDetail from "../PostCardDetail/PostCardDetail";

// -------- CSS/IMAGES -------- //
import "./PostcardExplore.css";

function PostCardExplore({ post, likes, postComments }) {
  const user = useSelector((state) => state.session.user) || "";

  const [showPostDetail, setShowPostDetail] = useState(false);

  const showDetails = (e) => {
    e.preventDefault();
    setShowPostDetail(true);
  };

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
            postComments={postComments}
          />
        </Modal>
      )}
    </div>
  );
}
export default PostCardExplore;
