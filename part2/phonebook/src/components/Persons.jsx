import SinglePerson from "./SinglePerson";

const Persons = ({ filter, persons }) => {
  return (
    <>
      {filter !== ""
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
              <SinglePerson
                key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}
              />
            ))
        : persons.map((person) => (
            <SinglePerson
              key={person.id}
              id={person.id}
              name={person.name}
              number={person.number}
            />
          ))}
    </>
  );
};

export default Persons;
