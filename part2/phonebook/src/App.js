import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(noteObject));
    setNewName("");
    setNewNumber("");
  };

  const filterPersons = (event) => {
    setSearchName(event.target.value);
  };

  const handleNameChange = (event) => {
    const found = persons.find((person) => person.name === event.target.value);
    if (found) alert(`${event.target.value} is already added to phonebook`);
    else setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} filterPersons={filterPersons} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} searchName={searchName} />
    </div>
  );
};

export default App;
