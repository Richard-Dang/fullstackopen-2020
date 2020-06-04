import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import LoggedIn from "./components/LoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { Switch, Route } from "react-router-dom";
import User from "./components/User";
import useMatchedResource from "./hooks/useMatchedResource";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(({ loggedInUser }) => loggedInUser);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  const user = useMatchedResource("/users/:id", users);
  const blog = useMatchedResource("/blogs/:id", blogs);

  useEffect(() => {
    dispatch(setLoggedInUser());
    const fetchBlogs = async () => dispatch(initializeBlogs());
    const fetchUsers = async () => dispatch(initializeUsers());
    fetchBlogs();
    fetchUsers();
  }, [dispatch]);

  return loggedInUser ? (
    <div>
      <LoggedIn loggedInUser={loggedInUser} />

      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  ) : (
    <LoginForm />
  );

  // return loggedInUser ? (
  //   <div>
  //     <UserList />
  //     <BlogList />
  //   </div>
  // ) : (
  //   <LoginForm />
  // );
};

export default App;
