const notificationReducer = (
  state = { message: "", timeoutID: null },
  action
) => {
  console.log(action.timeoutID);

  switch (action.type) {
    case "SET_MESSAGE":
      if (state.timeoutID) {
        clearTimeout(state.timeoutID);
      }
      return { message: action.message, timeoutID: null };
    case "SET_TIMEOUTID":
      return { ...state, timeoutID: action.timeoutID };
    default:
      return state;
  }
};

export const setMessage = (message, timeout) => {
  return async (dispatch) => {
    dispatch({ type: "SET_MESSAGE", message });
    const timeoutID = setTimeout(() => {
      dispatch({ type: "SET_MESSAGE", message: "" });
    }, timeout);
    dispatch({ type: "SET_TIMEOUTID", timeoutID });
  };
};

export default notificationReducer;
