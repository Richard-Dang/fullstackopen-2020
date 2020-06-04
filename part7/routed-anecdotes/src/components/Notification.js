import React from "react";

const Notification = ({ notification }) => {
  const notificatonStyle = {
    borderWidth: 1,
    borderColor: "black",
    border: "solid",
  };

  return notification ? (
    <div style={notificatonStyle}>{notification}</div>
  ) : null;
};

export default Notification;
