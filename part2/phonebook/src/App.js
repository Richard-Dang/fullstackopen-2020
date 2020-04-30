import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const filteredPersons = term
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(term.toLowerCase())
      )
    : persons;

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setTerm(term);
  };

  const handleDelete = ({ name, id }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => alert(`${name} was already deleted`));
    }
  };

  const updatePhone = (person, newNumber) => {
    if (
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedPerson = { ...person, number: newNumber };
      personService
        .updatePerson(updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id === returnedPerson.id ? returnedPerson : p
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          alert(`${person.name} was already deleted from server`);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      updatePhone(existingPerson, newNumber);
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.createPerson(newPerson).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
