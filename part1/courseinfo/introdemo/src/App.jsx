const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Course Name: {props.courseName}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>Course Section: {props.part}</p>
      <p>Course Exercises: {props.exercise}</p>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part part={props.part1} exercise={props.exercise1} />
      <Part part={props.part2} exercise={props.exercise2} />
      <Part part={props.part3} exercise={props.exercise3} />
    </>
  );
};
const Total = (props) => {
  console.log(props);
  return (
    <>
      <h5>Total Number of Exercise: {props.count}</h5>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const total = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header courseName={course} />
      <Content
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />
      {/* <Content part2={part2} exercise2={exercises2} />*/}
      {/* <Content part3={part3} exercise3={exercises3} />  */}
      <Total count={total} />

      {/* <p>Number of exercises </p> */}
    </div>
  );
};

export default App;
