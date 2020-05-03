import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

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

  const showMessage = (text, type) => {
    setMessage({
      text,
      type,
    });
    if (type !== "error") {
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
    }
  };

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
        .catch((err) => {
          showMessage(`${name} was already deleted`, "error");
        });
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
          showMessage(`Updated number for ${person.name}`, "success");
        })
        .catch((err) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          showMessage(
            `${person.name} was already deleted from server`,
            "error"
          );
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
      personService
        .createPerson(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setNewNumber("");
          showMessage(`Added ${person.name}`, "success");
        })
        .catch((err) => {
          showMessage(err.response.data.error, "error");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
