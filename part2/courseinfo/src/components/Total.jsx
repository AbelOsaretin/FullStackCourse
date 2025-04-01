const Total = ({ parts }) => {
  var result = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <h3>Total of {result} excercises</h3>;
};

export default Total;
