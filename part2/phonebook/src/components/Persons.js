import React from "react";

function Persons({ filteredPersons }) {
  return (
    <div>
      {filteredPersons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
}

export default Persons;
