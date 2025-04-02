import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
    };

    setPersons(persons.concat(newPersonObj));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => {
        return <div>{person.name}</div>;
      })}
    </div>
  );
};

export default App;
