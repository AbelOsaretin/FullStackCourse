const Part = ({ part }) => {
  return (
    <ul>
      {part.map((parts) => (
        <li key={parts.id}>
          {parts.name}
          {parts.exercises}
        </li>
      ))}
    </ul>
  );
};
export default Part;
