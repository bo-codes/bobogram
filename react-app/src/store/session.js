import { user } from "pg/lib/defaults";

// constants
const SET_USER = "session/SET_USER";
const UPDATE_USER = "session/UPDATE_USER";
const EDIT_PFP = "session/EDIT_PFP";
const REMOVE_USER = "session/REMOVE_USER";
const FOLLOW = "session/follow";
const UNFOLLOW = "session/unfollow";
const GET_FOLLOWED_POSTS = "session/GET_FOLLOWED_POSTS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

const editPfp = (profilePicture) => ({
  type: EDIT_PFP,
  profilePicture,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const actionFollowUser = (user) => {
  return {
    type: FOLLOW,
    user,
  };
};

export const actionUnfollowUser = (user) => {
  return {
    type: UNFOLLOW,
    user,
  };
};

export const actionGetFollowedPosts = (followedPosts) => {
  return {
    type: GET_FOLLOWED_POSTS,
    followedPosts,
  };
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, fullName) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        fullName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const thunkEditUser =
  (userId, fullName, username, website, bio, email, phoneNumber, gender) =>
  async (dispatch) => {
    console.log("USER NAME", fullName);
    const response = await fetch(`/api/auth/accounts/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        fullName,
        username,
        website,
        bio,
        email,
        phoneNumber,
        gender,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("DATA", data);
      dispatch(updateUser(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error has occured. Please try again."];
    }
  };

export const thunkEditPfp = (profilePicture, userId) => async (dispatch) => {
  if (typeof profilePicture === "object") {
    const postData = new FormData();
    postData.append("image", profilePicture);

    console.log("WE MADE IT TO RIGHT BEFORE REQUEST");

    const imageRes = await fetch(`/api/images/`, {
      method: "POST",
      body: postData,
    });

    console.log("WE MADE IT TO RIGHT AFTER REQUEST");

    if (imageRes.ok) {
      console.log("WE MADE IT TO RIGHT AFTER IF IMAGE.RES");
      profilePicture = await imageRes.json();
      profilePicture = profilePicture.url;
    } else if (imageRes.status < 500) {
      const data = await imageRes.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  }

  //
  const response = await fetch(`/api/auth/accounts/pfp/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profilePicture,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editPfp(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error has occured. Please try again."];
  }
};

export const thunkFollow = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/follow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const follow_user = await response.json();
    dispatch(actionFollowUser(follow_user));
    return follow_user;
  }
};

export const thunkUnfollow = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/${username}/unfollow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const unfollow_user = await response.json();
    dispatch(actionUnfollowUser(unfollow_user));
    return unfollow_user;
  }
};

export const thunkGetFollowedPosts = (id) => async (dispatch) => {
  console.log(id, "thunkGetFollowedPosts");
  const response = await fetch(`/api/users/${id}/follows`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetFollowedPosts(data));
    return data;
  }
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case UPDATE_USER:
      return { user: action.user };
    case EDIT_PFP:
      return { user: action.profilePicture };
    case REMOVE_USER:
      return { user: null };
    case GET_FOLLOWED_POSTS:
      console.log(action.followedPosts, "FOLLOWED POSTS REDUCER");
      newState = {};
      action.followedPosts.followedPosts.forEach((followedPost) => {
        newState[followedPost.id] = followedPost;
      });
      return newState;
    case FOLLOW:
      newState.user.following.push(action.user);
      return newState;
    case UNFOLLOW:
      const spliceIndex = newState.user.following.indexOf(action.user.id);
      newState.user.following.splice(spliceIndex, 1);
      return newState;
    default:
      return state;
  }
}
