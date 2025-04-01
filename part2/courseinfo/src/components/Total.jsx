const Total = ({ parts }) => {
  console.log("Parts For Total Cal", parts);
  var result = parts.reduce((sum, part) => {
    console.log("Current Sum", sum);

    console.log("Current exercises", part.exercises);

    return sum + part.exercises;
  }, 0);

  console.log("Total Result", result);
  return <h3>Total of {result} excercises</h3>;
};

export default Total;
