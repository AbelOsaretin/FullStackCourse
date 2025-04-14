import SinglePerson from "./SinglePerson";
import contactService from "../services/contact";

const Persons = ({ filter, persons }) => {
  const handleDelete = (id, name) => {
    console.log(id);
    if (confirm(`Delete ${name}?`)) {
      contactService
        .deleteContact(id)
        .then((response) => console.log(response));
    } else {
      console.log("Cancled");
    }
  };
  return (
    <>
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
                <button onClick={() => handleDelete(person.id, person.name)}>
                  Delete
                </button>
              </div>
            ))
        : persons.map((person) => (
            <div key={person.id}>
              <SinglePerson
                id={person.id}
                name={person.name}
                number={person.number}
              />
              <button onClick={() => handleDelete(person.id, person.name)}>
                Delete
              </button>
            </div>
          ))}
    </>
  );
};

export default Persons;
