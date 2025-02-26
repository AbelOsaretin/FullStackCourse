import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const DisplayAnecdotes = ({ headingText, anecdotesText, voteCount }) => {
  return (
    <div>
      <h1>{headingText}</h1>
      <p>{anecdotesText}</p>
      <p>Vote: {voteCount}</p>
    </div>
  );
};

// const AnecdoteWithMostVotes = ({ headingText, anecdotesText }) => {
//   const [mostVotes, setMostVotes] = useState(0);

//   const handleMostVotes = () => {
//     let max = 0;
//     let indexMax = 0;
//     votes.forEach((item, index) => {
//       if (item > max) {
//         max = item;
//         indexMax = index;
//       }
//     });

//     setMostVotes(indexMax);
//     return indexMax;
//   };

//   return (
//     <div>
//       <h1>{headingText}</h1>
//       <p>{anecdotesText[mostVotes]}</p>
//       <p>Most Vote Count: {mostVotes}</p>
//     </div>
//   );
// };

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [mostVotes, setMostVotes] = useState(0);

  // Generate a random integer between min (inclusive) and max (inclusive)
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleNextClick = () => {
    // Example: Random number between 1 and 10
    const randomInt = getRandomInt(0, 7);
    console.log(randomInt); // Outputs a number like 7
    setSelected(randomInt);
    handleMostVotes();
  };

  const handleVoteClick = () => {
    const copyVote = [...votes];

    copyVote[selected] += 1;

    setVote(copyVote);
    handleMostVotes();
  };

  const handleMostVotes = () => {
    let max = 0;
    let indexMax = 0;
    votes.forEach((item, index) => {
      if (item > max) {
        max = item;
        indexMax = index;
      }
    });

    setMostVotes(indexMax);
    console.log("Most Voted", indexMax);
    return indexMax;
  };

  return (
    <div>
      <DisplayAnecdotes
        headingText={"Anecdote of the day"}
        anecdotesText={anecdotes[selected]}
        voteCount={votes[selected]}
      />
      <Button text={"Vote"} onClick={handleVoteClick} />
      <br />
      <br />
      <Button text={"Next Anecdotes"} onClick={handleNextClick} />
      <br />

      <h1>Anecdote With Most Votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>
    </div>
  );
};

export default App;
