import React, { useState } from "react";

const Button = (props) => {
  let { text, onClick } = props;

  return <button onClick={onClick}>{text}</button>;
};
const Table = (props) => {
  let { keyz, value } = props;

  return (
    <table>
      <tbody>
        <tr>
          <td>{keyz}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};
const Statistics = (props) => {
  let { good, neutral, bad, total, average, positive } = props;

  // if (total === 1) {
  return (
    <div>
      <h1>Statistics</h1>

      <Table keyz="Good" value={good} />
      <Table keyz="Neutral" value={neutral} />
      <Table keyz="Bad" value={bad} />
      <Table keyz="All" value={total} />
      <Table keyz="Average" value={average} />
      <Table keyz="Positive" value={positive} />
    </div>
  );
  // }

  // return (
  //   <div>
  //     <h1>Statistics</h1>
  //     <p>No feedback given</p>
  //   </div>
  // );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  let total = good + bad + neutral;

  const goodHandler = () => {
    setGood(good + 1);
    setAverage((good - bad) / total);
    setPositive(good / total);
  };

  const neutralHandler = () => {
    setNeutral(neutral + 1);
  };

  const badHandler = () => {
    setBad(bad + 1);
    setAverage((good - bad) / total);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" onClick={goodHandler} />
      <Button text="Neutral" onClick={neutralHandler} />
      <Button text="Bad" onClick={badHandler} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
}

export default App;
