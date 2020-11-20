import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter((person) => filter === "" || person.name.includes(filter))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  handleAddName,
  newNumber,
  handleAddNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleAddName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleAddNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddName = (event) => {
    console.log(event);
    setNewName(event.target.value);
  };
  const handleAddNumber = (event) => {
    console.log(event);
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    console.log(event);
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    const name = newName;
    const number = newNumber;

    // check already added
    const contains = persons.map((person) => person.name).includes(name);
    if (contains) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: name, number: number }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
