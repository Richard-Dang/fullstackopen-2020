import React, { useState, useEffect } from "react";
import axios from "axios";

function CountryDetail({ country }) {
  const { name, capital, population, languages, flag } = country;
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      console.log(capital);
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      );
      console.log(response.data);
      setWeather(response.data.current);
    };
    fetchWeather();
  }, [api_key, capital]);

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
      {weather ? (
        <div>
          <h2>Weather in {capital}</h2>
          <h4>temperature: {weather.temperature} Celcius</h4>
          <img src={weather.weather_icons} alt={capital} />
          <h4>
            wind: {weather.wind_speed} mph direction {weather.wind_dir}
          </h4>
        </div>
      ) : null}
    </div>
  );
}

export default CountryDetail;
