import Person from "./Person";

const Persons = ({ persons, searchName }) => {
  const personsToShow = searchName
    ? persons.filter((person) => person.name.toLowerCase().includes(searchName))
    : persons;

  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
