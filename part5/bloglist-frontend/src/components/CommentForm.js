import React from "react";
import useField from "../hooks/useField";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../reducers/blogReducer";
import useMatchedResource from "../hooks/useMatchedResource";

const CommentForm = () => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...commentInput } = useField("text");
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = useMatchedResource("/blogs/:id", blogs);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const comment = {
      content: commentInput.value,
    };
    dispatch(createComment({ blog, comment }));
    resetComment();
  };
  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input {...commentInput}></input>
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
