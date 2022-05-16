import { useState } from "react";

function App() {
  const nextAnecdote = () => {
    setSelected((selected + 1) % anecdotes.length);
  };

  const incrementVotes = (selected) => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    let max = most;
    let newInd = ind;

    newVotes.forEach((vote, index) => {
      if (vote > max) {
        max = vote;
        newInd = index;
      }
    });

    setMost(max);
    setInd(newInd);
  };

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  let points = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(points);
  let [most, setMost] = useState(0);
  let [ind, setInd] = useState(0);

  return (
    <div className="App">
      <h1>Anecdote of the day </h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={nextAnecdote}>next anecdote</button>
      <button onClick={() => incrementVotes(selected)}>vote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[ind]}</p>
    </div>
  );
}

export default App;
