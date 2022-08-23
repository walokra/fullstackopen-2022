import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const showMessage = (message, type = "success") => {
    setNotificationType(type);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find((p) => p.name === newName);

    if (person) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...person, number: newNumber };

        personService.update(person.id, changedPerson).then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== returnedPerson.id ? person : returnedPerson)));
          showMessage(`'${newName}' was updated`);
          setNewName("");
          setNewNumber("");
          event.target.reset();
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showMessage(`Added '${newName}'`);
          setNewName("");
          setNewNumber("");
          event.target.reset();
        })
        .catch((error) => {
          console.log(error.response.data);
          showMessage(`${JSON.stringify(error.response.data.error)}`);
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const filterPersons = (event) => setSearchName(event.target.value);

  const handlePersonDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).catch((error) => {
        showMessage(`Person '${person.name}' was already removed from server`, "error");
        setPersons(persons.filter((n) => n.id !== person.id));
      });
      setPersons(persons.filter((n) => n.id !== person.id));
      showMessage(`'${person.name}' was deleted`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notificationType} />

      <Filter searchName={searchName} filterPersons={filterPersons} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} searchName={searchName} deletePerson={handlePersonDelete} />
    </div>
  );
};

export default App;
