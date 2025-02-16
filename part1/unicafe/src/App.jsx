import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

const Total = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>Total : {good + neutral + bad}</p>
    </div>
  );
};

// calTotal();

const Average = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>Average : {good + neutral + bad / 3}</p>
    </div>
  );
};

const PositiveRating = ({ good, neutral, bad }) => {
  const totaRating = good + neutral + bad;
  return (
    <div>
      <p>Positive Rating : {(good / totaRating) * 100} %</p>
    </div>
  );
};

const StatsDisplay = ({ text, number }) => {
  return (
    <div>
      <p>
        {text}: {number}
      </p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={"give feedback"} />
      <Button text={"good"} onClick={() => setGood(good + 1)} />
      <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} onClick={() => setBad(bad + 1)} />
      <Header text={"statistics"} />
      <StatsDisplay text={"good"} number={good} />
      <StatsDisplay text={"neutral"} number={neutral} />
      <StatsDisplay text={"bad"} number={bad} />
      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <PositiveRating good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
