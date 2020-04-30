import React from "react";

function Persons({ filteredPersons, handleDelete }) {
  const component = filteredPersons.map((person) => {
    return (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)}>delete</button>
      </div>
    );
  });

  return <div>{component}</div>;
}

export default Persons;
