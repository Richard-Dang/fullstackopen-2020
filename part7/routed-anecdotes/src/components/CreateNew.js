import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew, notify }) => {
  const { reset:contentReset , ...content } = useField("text");
  const { reset:authorReset , ...author } = useField("text");
  const { reset:infoReset , ...info } = useField("text");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    notify(`Added new anecdote: ${content.value}`, 5000);
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button
          type="button"
          onClick={() => {
            contentReset();
            authorReset();
            infoReset();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
