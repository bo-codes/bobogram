// IMPORT REACT STUFF
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
// IMPORT COMPONENTS WE'RE USING
import DeletePostModal from "../../Elements/DeletePostModal/DeletePostModal";
// IMPORT THUNKS WE NEED TO DISPATCH
import { makePost, editPost } from "../../../../store/posts";

import "./PostOptionsForm.css";

// THIS IS OUR POST CREATION/EDIT FORM COMPONENT
function PostOptionsForm({
  post = null,
  setShowCreatePost,
  setShowConfirmDeleteModal,
  showConfirmDeleteModal,
}) {
  // SETTING STATES
  const [date, setDate] = useState((post && post.created_at) || "");
  const [image, setImage] = useState((post && post.image_url) || "");
  const [caption, setCaption] = useState((post && post.caption) || "");
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  // const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // SETTING UP THE useHistory AND useDispatch FUNCTIONS
  const history = useHistory();
  const dispatch = useDispatch();

  // PULLING THE CURRENT USER IN OUR STATE
  const userId = useSelector((state) => state.session.user.id);

  // ---------------------- ON SUBMITTAL ---------------------- vv//
  const submit = async (e) => {
    // PREVENTS PAGE FROM DOING DEFAULT PAGE RELOAD
    e.preventDefault();

    // SETS ERRORS TO EMPTY TO PREP IT FOR ERROR CHECK BELOW
    setErrors([]);

    // IF CURRENT USER ISNT SIGNED IN AND THEREFORE NOT IN THE SESSION STATE
    if (!userId) {
      // ADD THE ERROR INTO THE Errors STATE SLICE
      setErrors(["You must be logged in to create or edit an post."]);
      setErrors(post);
      return;
    }

    // IMAGE IS LOADING SO SET THAT TO TRUE
    setImageLoading(true);
    // SET THE DATE TO WHATEVER THE POST DATE IS IN YOUR SUBMITTED FORM
    setDate(date);

    // ----------- CREATION / DISPATCHES ----------- vv//
    // IF THERE IS NO POST, THEN RUN THE makePost DISPATCH WITH ALL OF THE INFO FROM THE FORM, WHICH
    if (!post) {
      // CREATING
      post = await dispatch(
        makePost(userId, image, caption, date)
        // WE ARE JUST PULLING FROM THE SLICES OF STATE ABOVE BECAUSE WE HAVE THE FORM SET UP TO UPDATE
        // THE SLICES OF STATE LIVE/onChange
      );

      // IF THE DISPATCH SUCCESSFULLY CREATES AND RETURNS A POST, THEN RETURN TO END THE FUNCTION
      if (post.id) {
        history.push(window.location.pathname);
        return;
      }
    }
    // IF THERE IS A POST, RUN THE editPost DISPATCH WITH ALL THE INFO FROM THE FORM
    else {
      post = await dispatch(
        editPost(post.id, userId, image, caption, date.replace("T", " "))
      );
    }
    // ----------- CREATION / DISPATCHES ----------- ^^//

    // AFTER DISPATCHING ABOVE, THE IMAGE IS NO LONGER LOADING, THE DISPATCH HAS BEEN RUN AND WE HAVE
    // A POST NOW WHICH MEANS ITLL NOW RENDER THE UPDATE BUTTON AND ENABLE IT SO YOU CAN CLICK IT
    setImageLoading(false);

    // IF POST IS AN ARRAY, SET THE ERRORS TO POST
    if (Array.isArray(post)) {
      setErrors(post);
    } else {
      setShowCreatePost(false);
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
    <div id="own-post-options">
      {/* ----------------------FORM ---------------------- vv*/}
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Report</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">
          <span className="critical-operations">Unfollow</span>
        </button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Add to favorites</button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Go to post</button>
      </div>
      <div className="own-post-options-button">
        <button className="button-text">Cancel</button>
      </div>
      {/* ---------------------- FORM ---------------------- ^^*/}
    </div>
  );
}

export default PostOptionsForm;
