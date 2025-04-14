import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
// import axios from "axios";
import contactService from "./services/contact";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log(contactService.getAll());
    console.log("effect");
    contactService.getAll().then((contacts) => {
      console.log("Setting response to Persons");
      setPersons(contacts);
    });
  }, []);

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    if (!persons.find((person) => person.name == newPersonObj.name)) {
      // axios
      //   .post("http://localhost:3001/persons", newPersonObj)

      contactService.addContact(newPersonObj).then((response) => {
        console.log(response.data);
        setPersons(persons.concat(newPersonObj));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  // const handleDelete = (id) => {
  //   contactService.deleteContact(id).then((response) => console.log(response));
  // };

  return (
    <>
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
    </>
  );
};

export default App;
