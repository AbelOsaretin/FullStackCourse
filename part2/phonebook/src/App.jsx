import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    if (!persons.find((person) => person.name == newPersonObj.name)) {
      setPersons(persons.concat(newPersonObj));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    console.log(persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person, i) => {
        return (
          <div key={i}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
