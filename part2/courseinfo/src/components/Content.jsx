import Part from "./Part";
const Content = ({ part }) => {
  return part.map((parts, i) => <Part key={i} parts={parts} />);
};

export default Content;
