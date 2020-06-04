import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { text, type } = useSelector(({ notification }) => notification);
  const notificationStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const typeStyle = type === "error" ? { color: "red" } : { color: "green" };

  return text ? (
    <div
      style={{ ...notificationStyle, ...typeStyle }}
      className="notification"
    >
      {text}
    </div>
  ) : null;
};

export default Notification;
