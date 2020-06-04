import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const updatedAnecdote = action.data;
      return state.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      );
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

const voteFor = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes += 1;
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote);
    dispatch({ type: "VOTE", data: updatedAnecdote });
  };
};

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
  };
};

const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content);
    dispatch({ type: "NEW_ANECDOTE", data: anecdote });
  };
};

export { voteFor, createAnecdote, initializeAnecdotes };
export default anecdoteReducer;
