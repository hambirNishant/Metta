// 

import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/currency/${searchTerm}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Country Currency Search💰</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search By Currency INR,EUR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      <div className="country-list">
        {Array.isArray(countries) &&
          countries.map((country, index) => (
            <div className="country-card" key={index}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <hr />
              <img
                src={`https://flagsapi.com/${country.cca2}/flat/64.png`}
                alt={`${country.name.common} flag`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
