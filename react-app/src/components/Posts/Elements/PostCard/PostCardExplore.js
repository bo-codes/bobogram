// IMPORT REACT STUFF --------
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../Global/Elements/Modal";
import { Link } from "react-router-dom";
// -------- CSS/IMAGES -------- //
import "./PostcardExplore.css";

function PostCardExplore({ post, likes }) {

  const user = useSelector((state) => state.session.user) || "";

  return (
    <div className="postcard-explore">
      {/* ----------- POST IMAGE ----------- vv*/}
      <Link
      style={{
        textDecoration: 'none',
      }}
      to={`/posts/${post.id}`}>
        {post.image_url && (
          <div className="postcard-image" style={{
            backgroundImage: `url(${post.image_url})`
          }}></div>
        )}
      </Link>
      {/* ----------- POST IMAGE ----------- ^^*/}
    </div>
  );
}
export default PostCardExplore;
