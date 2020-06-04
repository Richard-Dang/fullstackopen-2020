import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdotesToShow = filter
      ? anecdotes.filter(({ content }) =>
          content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes;

    return anecdotesToShow.sort((a, b) => a.votes < b.votes);
  });

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote));
    dispatch(setMessage(`You voted "${anecdote.content}"`, 3000));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
