import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const component = parts.map((part, i) => {
    return <Part key={i} name={part.name} exercises={part.exercises} />;
  });

  return <div>{component}</div>;
};

export default Content;
