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
              <div key={person.id}>
                <SinglePerson
                  id={person.id}
                  name={person.name}
                  number={person.number}
                />
              </div>
            ))
        : persons.map((person) => (
            <SinglePerson
              key={person.id}
              id={person.id}
              name={person.name}
              number={person.number}
            />
          ))}
    </div>
  );
};

export default Persons;
