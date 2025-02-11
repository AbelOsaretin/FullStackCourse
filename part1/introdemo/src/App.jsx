const Footer = () => {
  return (
    <div>
      greeting app created by{" "}
      <a href="https://github.com/AbelOsaretin">AbelOsaretin</a>
    </div>
  );
};

const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name}, your age is {props.age}
      </p>
    </div>
  );
};

const App = () => {
  const name = "George";
  const age = 20;
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name={name} age={age} />
      <Hello name="Daisy" age={19 + age} />
      <Footer />
    </div>
  );
};

export default App;
