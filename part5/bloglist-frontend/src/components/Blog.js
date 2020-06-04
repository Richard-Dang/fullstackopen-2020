import React from "react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer";
import Comments from "./Comments";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    const updatedBlog = blog;
    updatedBlog.likes++;
    // When updating, need to make sure that only ids for users and comments belong to object
    updatedBlog.user = blog.user.id;
    updatedBlog.comments = blog.comments.map((c) => c.id);
    dispatch(updateBlog(updatedBlog));
  };

  return blog ? (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes <span>{blog.likes}</span>
        <button onClick={handleLike}>like</button>
      </p>
      {blog.user ? <p>added by {blog.user.name}</p> : null}
      <Comments comments={blog.comments} />
    </div>
  ) : null;
};

export default Blog;
