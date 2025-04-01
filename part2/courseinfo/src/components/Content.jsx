import Part from "./Part";
const Content = ({ part }) => {
  return part.map((parts) => <Part key={parts.id} parts={parts} />);
};

export default Content;
