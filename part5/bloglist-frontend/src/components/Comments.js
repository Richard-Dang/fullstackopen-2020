import React from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comments }) => {
  return comments ? (
    <div>
      <h3>Comments</h3>
      <CommentForm/>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Comments;
