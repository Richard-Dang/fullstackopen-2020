const notificationReducer = (state = { type: "", text: "" }, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch({ type: "SET_NOTIF", data: notification });
    setTimeout(
      () => dispatch({ type: "SET_NOTIF", data: { type: "", text: "" } }),
      5000
    );
  };
};

export default notificationReducer;
