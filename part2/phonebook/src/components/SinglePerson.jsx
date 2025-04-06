const SinglePerson = ({ id, name, number }) => {
  return (
    <div key={id}>
      {name} {number}
    </div>
  );
};

export default SinglePerson;
