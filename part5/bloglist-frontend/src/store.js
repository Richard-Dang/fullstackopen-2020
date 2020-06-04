import blogReducer from "./reducers/blogReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  users: userReducer,
  loggedInUser: loginReducer,
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
