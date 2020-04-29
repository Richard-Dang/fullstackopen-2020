import React, { useState } from "react";
import CountryDetail from "./CountryDetail";

function Countries({ countries }) {
  const [detailedCountries, setDetailedCountries] = useState([]);

  const handleShow = (event) => {
    setDetailedCountries(detailedCountries.concat(event.target.value));
  };

  switch (true) {
    case countries.length > 10:
      return <p>Too many matches, specify another filter</p>;
    case countries.length === 1:
      return <CountryDetail country={countries[0]} />;
    case countries.length > 1 && countries.length <= 10:
      const countryComponent = (country) => {
        const showCountryDetail = detailedCountries.some(
          (name) => name === country.name
        );

        return showCountryDetail ? (
          <CountryDetail country={country} key={country} />
        ) : (
          <div key={country.name}>
            {country.name}
            <button onClick={handleShow} value={country.name}>
              show
            </button>
          </div>
        );
      };
      return countries.map((country) => countryComponent(country));
    default:
      return null;
  }
}

export default Countries;
