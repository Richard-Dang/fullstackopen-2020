import React from "react";
import BlogForm from "../components/BlogForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogList() {
  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((a, b) => a.likes < b.likes);
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <BlogForm />
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
