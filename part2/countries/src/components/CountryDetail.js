import React from "react";

function CountryDetail({ country }) {
  const { name, capital, population, languages, flag } = country;
  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img src={flag} alt={name} width="100" />
    </div>
  );
}

export default CountryDetail;
