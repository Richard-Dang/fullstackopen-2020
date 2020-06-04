import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useField from "../hooks/useField";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

function BlogForm() {
  const dispatch = useDispatch();
  const { reset: resetTitle, ...titleInput } = useField("text");
  const { reset: resetAuthor, ...authorInput } = useField("text");
  const { reset: resetUrl, ...urlInput } = useField("text");
  const [showComponent, setShowComponent] = useState(false);

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value,
    };
    dispatch(createBlog(newBlog));
    resetTitle();
    resetAuthor();
    resetUrl();
    dispatch(
      setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      })
    );
  };

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleBlogSubmit}>
          <div>
            title:
            <input id="title" {...titleInput} />
          </div>
          <div>
            author:
            <input id="author" {...authorInput} />
          </div>
          <div>
            url:
            <input id="url" {...urlInput} />
          </div>
          <button type="submit" id="create-button">
            create
          </button>
          <button onClick={() => setShowComponent(false)}>cancel</button>
        </form>
      </div>
    );
  };

  return showComponent ? (
    blogForm()
  ) : (
    <button onClick={() => setShowComponent(true)}>new blog</button>
  );
}

export default BlogForm;
