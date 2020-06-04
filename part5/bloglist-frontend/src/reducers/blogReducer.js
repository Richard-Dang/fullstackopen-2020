import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      return state.map((b) => (b.id !== action.data.id ? b : action.data));
    case "DELETE_BLOG":
      return state.filter((b) => b.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.createBlog(blog);
    dispatch({ type: "NEW_BLOG", data: returnedBlog });
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.updateBlog(blog);
    dispatch({ type: "UPDATE_BLOG", data: returnedBlog });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch({ type: "DELETE_BLOG", data: blog });
  };
};

export const createComment = ({ blog, comment }) => {
  return async (dispatch) => {
    const returnedComment = await blogService.createComment({ blog, comment });
    const updatedBlog = blog;
    updatedBlog.comments.push(returnedComment);
    dispatch({ type: "UPDATE_BLOG", data: updatedBlog });
  };
};

export default blogReducer;
