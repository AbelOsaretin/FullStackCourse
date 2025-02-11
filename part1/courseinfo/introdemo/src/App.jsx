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
  const count = props.exercise1 + props.exercise2 + props.exercise3;
  console.log(count);
  return (
    <>
      <h5>Total Number of Exercise: {count}</h5>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content
        part1={course.parts[0].name}
        exercise1={course.parts[0].exercises}
        part2={course.parts[1].name}
        exercise2={course.parts[1].exercises}
        part3={course.parts[2].name}
        exercise3={course.parts[2].exercises}
      />
      <Total
        exercise1={course.parts[0].exercises}
        exercise2={course.parts[1].exercises}
        exercise3={course.parts[2].exercises}
      />
    </div>
  );
};

export default App;
