import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [term, setTerm] = useState("");

  const filteredCountries = term
    ? countries.filter(({ name }) =>
        name.toLowerCase().includes(term.toLowerCase())
      )
    : countries;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountries(response.data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <Search term={term} handleSearch={handleSearch} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
