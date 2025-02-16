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

// calTotal();

const Statistics = ({ headerText, good, neutral, bad }) => {
  const totaRating = good + neutral + bad;
  return (
    <div>
      <h1>{headerText}</h1>
      <p>Good : {good}</p>
      <p>Neutral : {neutral}</p>
      <p>Bad : {bad}</p>
      <p>Total : {good + neutral + bad}</p>
      <p>Average : {good + neutral + bad / 3}</p>
      <p>Positive Rating : {(good / totaRating) * 100} %</p>
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
      <Statistics
        headerText={"statistics"}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
