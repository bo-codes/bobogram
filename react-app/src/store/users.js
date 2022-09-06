const GET_SINGLE_USER = "user/GET_SINGLE_USER";
const GET_ALL_USERS = "users/GET_ALL_USERS";
const GET_SEARCHED_USERS = "users/GET_SEARCHED_USERS";
const UPDATE_USER = "session/UPDATE_USER";
const DELETE_USER = "session/DELETE_USER";

const actionGetUser = (user) => ({
  type: GET_SINGLE_USER,
  user,
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

const deleteUser = () => ({
  type: DELETE_USER,
});


const actionGetAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

const actionGetSearchedUsers = (users) => ({
  type: GET_SEARCHED_USERS,
  users,
});

export const thunkGetUser = (username) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${username}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(actionGetUser(user));
    return user;
  }
};

export const destroyUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/auth/dashboard/${userId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteUser(userId));
  }
};

export const thunkEditUser =
  (user_id, username, email, password, avatar) => async (dispatch) => {
    const response = await fetch(`/api/auth/dashboard/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user_id,
        username,
        email,
        password,
        avatar,
      }),
    });

    if (response.ok) {
      const data = await response.json();
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


const initialState = {};

const userReducer = (state = initialState, action) => {
  // console.log("BEFORE ACTION", action, "ACTION HERE BOZO");
  let newState = { ...state };
  switch (action.type) {
    case GET_SINGLE_USER:
      newState = {};
      newState[action.user.username] = action.user;
      return newState;

    case GET_ALL_USERS:
      newState = {};
      // console.log("ACTION", action);
      action.users.users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    case UPDATE_USER:
      newState.user = action.payload;
      return newState;
    case DELETE_USER:
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default userReducer;
