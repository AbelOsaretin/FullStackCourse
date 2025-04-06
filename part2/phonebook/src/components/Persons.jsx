import SinglePerson from "./SinglePerson";

const Persons = ({ filter, persons }) => {
  return (
    <div>
      {filter !== ""
        ? persons
            .filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
              <SinglePerson
                key={person.id}
                name={person.name}
                number={person.number}
              />
            ))
        : persons.map((person) => (
            <SinglePerson
              key={person.id}
              name={person.name}
              number={person.number}
            />
          ))}
    </div>
  );
};

export default Persons;
