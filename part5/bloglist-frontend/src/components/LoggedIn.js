import React from "react";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import { useHistory, Link } from "react-router-dom";

const LoggedIn = ({ loggedInUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    history.push("/");
    dispatch(logoutUser());
  };
  return loggedInUser ? (
    <div>
      <div style={{ backgroundColor: "lightgrey", padding: 5 }}>
        <Link style={{ margin: 5 }} to="/">
          blogs
        </Link>
        <Link style={{ margin: 5 }} to="/users">
          users
        </Link>
        <span style={{ margin: 5 }}>{loggedInUser.name} has logged in</span>
        <button onClick={handleLogOut}>logout</button>
      </div>
      <h2>Blogs App</h2>
      <Notification />
    </div>
  ) : null;
};

export default LoggedIn;
