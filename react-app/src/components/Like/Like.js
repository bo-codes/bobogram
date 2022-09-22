import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../../store/posts";
import { addOneLike, deleteLike, getAllLikes } from "../../store/likes";

// const BookmarkEventName = styled.link`
//   cursor: pointer;
// `;

function Like({ post_id, user_id = null, likes = null, postLikes = null }) {
  const dispatch = useDispatch();

  const [like, setLike] = useState(null);

  useEffect(() => {
    if (postLikes) {
    }
    setLike(
      Object.values(postLikes).filter((like) => {
        return parseInt(like.post_id) === parseInt(post_id);
      })[0]
    );
  }, [postLikes, post_id]);

  const clickButton = () => {
    if (!like) dispatch(addOneLike({ post_id, user_id }));
    else {
      dispatch(deleteLike(like));
    }
  };

  return (
    <>
      {user_id && !like && (
        <>
          <button className="post-btns" onClick={clickButton}>
            <div id="heart-btn"></div>
          </button>
        </>
      )}
      {user_id && like && (
        <button className="post-btns" onClick={clickButton}>
          <div id="filled-heart-btn"></div>
        </button>
      )}
    </>
  );
}

export default Like;
