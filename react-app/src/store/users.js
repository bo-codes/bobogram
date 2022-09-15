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
  const response = await fetch(`/api/users/${username}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(actionGetUser(user));
    return user;
  }
};

export const thunkGetAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);

  if (response.ok) {
    const users = await response.json();
    dispatch(actionGetAllUsers(users));
    return users;
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

const initialState = {};

const userReducer = (state = initialState, action) => {
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
      newState.user = action.payload.user;
      return newState;
    case DELETE_USER:
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default userReducer;
