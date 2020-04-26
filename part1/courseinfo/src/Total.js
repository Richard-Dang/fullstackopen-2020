import React from "react";

const Total = ({ parts }) => {
  const numExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {numExercises}</p>;
};

export default Total;
