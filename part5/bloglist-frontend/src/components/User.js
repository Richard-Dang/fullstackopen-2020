import React from "react";

const User = ({ user }) => {
  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default User;
