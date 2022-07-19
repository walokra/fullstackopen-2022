import Person from "./Person";

const Persons = ({ persons, searchName, deletePerson }) => {
  const personsToShow = searchName
    ? persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons;

  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </ul>
  );
};

export default Persons;
