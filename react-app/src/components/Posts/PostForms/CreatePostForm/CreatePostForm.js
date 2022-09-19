// IMPORT REACT STUFF
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// IMPORT THUNKS WE NEED TO DISPATCH
import { makePost, editPost, makePostTag } from "../../../../store/posts";
import "../../../auth/SignupForm/SignupForm.css";
import "./CreatePostForm.css";

// THIS IS OUR POST CREATION/EDIT FORM COMPONENT
function CreatePostForm({ post = null, setShowCreatePostForm }) {
  // SETTING STATES
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [tags, setTags] = useState((post && post.tag) || []);
  const [tag, setTag] = useState((post && post.tag) || []);
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const user_id = useSelector((state) => state.session.user.id);

  // const createTag = async (e) => {
  //   e.preventDefault();

  //   if (!user_id) {
  //     setErrors(["You must be logged in to create a tag."]);
  //     return;
  //   } else {
  //     let newTag = await dispatch(makePostTag(tag));
  //   }
  // };

  // ---------------------- ON SUBMITTAL ---------------------- vv//
  const submit = async (e) => {
    e.preventDefault();

    setErrors([]);

    if (!user_id) {
      setErrors(["You must be logged in to create or edit an post."]);
      setErrors(post);
      return;
    }

    setImageLoading(true);
    setDate(date);

    if (!post) {
      post = await dispatch(makePost(user_id, image, caption, date));

      if (post.id) {
        history.push(`/home`);
        setShowCreatePostForm(false);
        return;
      }
    } else {
      post = await dispatch(
        editPost(post.id, user_id, image, caption, date.replace("T", " "))
      );
    }

    setImageLoading(false);

    if (Array.isArray(post)) {
      setErrors(post);
    } else {
      setShowCreatePostForm(false);
      return;
    }
  };
  // ---------------------- ON SUBMITTAL ---------------------- ^^//

  // FUNCTION TO SET IMAGE TO WHATEVER WE UPLOAD WHEN WE UPLOAD
  const updateImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  // FUNCTION TO TOGGLE THE VISIBILITY OF DELETE POST MODAL WHEN A BUTTON IS CLICKED
  const deletePostModal = () => {
    setShowConfirmDeleteModal(true);
  };

  return (
    <div className="create-page-container">
      <div className="post-create-form-half">
        <div className="post-create-form-container">
          <div className="post-create-form-title">
            <div>
              <button className="create-form-share-button-invisible">
                Share
              </button>
            </div>
            <span>Create a new post</span>
            {image ? (
              <div>
                <button className="create-form-share-button" onClick={submit}>
                  Share
                </button>
              </div>
            ) : (
              <div>
                <button className="create-form-share-button-disabled" onClick={submit} disabled>
                  Share
                </button>
              </div>
            )}
          </div>
          {/* ----------------------FORM ---------------------- vv*/}
          <form className="post-create-form">
            {/* -------- ERROR DISPLAY -------- vv*/}
            <div>
              <ul>
                {errors &&
                  errors.map((error) => {
                    let splitError = error.split(":");
                    return (
                      <li key={error}>
                        {/* {firstLetter + firstPart.slice(1) + secondPart} */}
                        <span
                          style={{
                            color: "#9387bc",
                          }}
                        >
                          ✖
                        </span>
                        {splitError[1]}
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* -------- ERROR DISPLAY -------- ^^*/}

            {/* ----- IMAGE INPUT ----- vv*/}
            {image && (
              <div
                className="image-preview"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <div className="create-post-inputs">
              <div className="input-section-image">
                <div className="image-input-jpg"></div>
                <input
                  id="image-upload-button"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={updateImage}
                  className="image-upload-button"
                />
                {image && (
                  <span
                    htmlFor="image-upload-button"
                    name="image"
                    className="imput-label"
                  >
                    {/* {image.name} */}
                  </span>
                )}
              </div>
              {/* ----- IMAGE INPUT ----- ^^*/}
              {/* ----- CAPTION INPUT ----- vv*/}
              <div className="input-section-caption">
                <div className="username-create-post-bar">
                  <img
                    src={user.profile_picture}
                    className="user-pfp-create-post"
                  />
                  <label htmlFor="caption" className="caption-label">
                    {user.username}
                  </label>
                </div>
                <textarea
                  name="caption"
                  type="text"
                  value={caption}
                  placeholder="Write a caption..."
                  onChange={(e) => setCaption(e.target.value)}
                  className="caption-input"
                />
              </div>
              {/* ----- CAPTION INPUT ----- ^^*/}
            </div>

            {/* ----- TAGS INPUT ----- vv*/}
            {/* <div className="input-section">
              <label htmlFor="tags">Tags</label>
              <textarea
                style={{
                  width: "230px",
                }}
                name="tags"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              /> */}
            {/* ----- TAGS INPUT ----- ^^*/}
            {/* </div> */}
            {/* ----- CREATE TAG BUTTON ----- vv*/}
            {/* <button onClick={createTag}>Add Tag</button> */}
            {/* ----- CREATE TAG BUTTON -----^^*/}
            {/* <div>
              <div>
                <button className="login-button">Create Post</button>
              </div>
            </div> */}
          </form>
        </div>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default CreatePostForm;
