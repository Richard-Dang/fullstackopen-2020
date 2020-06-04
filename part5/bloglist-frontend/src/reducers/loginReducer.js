import loginService from "../services/login";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN_USER":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedInBlogUser");
    dispatch({ type: "LOG_OUT" });
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    if (user) {
      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      dispatch({ type: "SET_LOGGED_IN_USER", data: user });
    }
  };
};

export const setLoggedInUser = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch({ type: "SET_LOGGED_IN_USER", data: user });
    }
  };
};

export default loginReducer;
