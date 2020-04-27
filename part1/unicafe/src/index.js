import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
        clickHandler={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        clickHandler={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        clickHandler={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <h1>Statistics</h1>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <Statistic text="good" value={good} />
              <Statistic text="neutral" value={neutral} />
              <Statistic text="bad" value={bad} />
              <Statistic text="all" value={total} />
              <Statistic text="average" value={(good - bad) / total} />
              <Statistic text="positive" value={`${(good / total) * 100}%`} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
