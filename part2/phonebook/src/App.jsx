import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setFilter(event.target.value);

    console.log(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
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

      <Filter value={filter} onChange={handleFilterInput} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleFormSubmit}
        valueName={newName}
        onChangeName={handleNameInput}
        valueNumber={newNumber}
        onChangeNumber={handleNumberInput}
      />
      <h3>Numbers</h3>

      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
