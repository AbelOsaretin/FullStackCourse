const SinglePerson = ({ key, name, number }) => {
  return (
    <div key={key}>
      {name} {number}
    </div>
  );
};

export default SinglePerson;
