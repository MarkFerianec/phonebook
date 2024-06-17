import { useState, useEffect } from 'react';
import Service from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    Service.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      // This causes problems
      // id: persons.length + 1,
    };

    let nameExists = persons.some(
      (person) => person.name === personObject.name
    );

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      Service.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const deletePerson = (id) => {
    Service.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });

    // I might need something like this:
    // setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    // Because the promise should be what is used for rendering???
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
