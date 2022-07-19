import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
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

  const handlePersonDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id);
      setPersons(persons.filter((n) => n.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} filterPersons={filterPersons} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} searchName={searchName} deletePerson={handlePersonDelete} />
    </div>
  );
};

export default App;
