// -------- IMPORT REACT STUFF -------- //
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
// -------- COMPONENTS -------- //
import PostCard from "../../Posts/Elements/PostCard/PostCard";
// --------- THUNKS -------- //
import { getAllCommentsThunk } from "../../../store/comments";
import { getAllPostsThunk } from "../../../store/posts";
// --------- CSS AND IMAGES -------- //
import "./images.css";
import sleepinCat from "../../../images/sleepin-cat.png";
import LoginFormPosts from "../../auth/LoginFormCreatePost/LoginFormCreatePost";

function SplashPage() {
  return (
    <div>
      <LoginFormPosts />
    </div>
  );
}

export default SplashPage;
