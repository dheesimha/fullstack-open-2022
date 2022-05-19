import axios from "axios";
import React, { useEffect, useState } from "react";

function Final({ length, countryNames }) {
  if (length === true) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return countryNames.map((country) => {
      return <li key={country}>{country}</li>;
    });
  }
}

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [length, setLength] = useState(false);

  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    setSearchVal(e.target.value);
  };

  let countriesHook = () => {
    // setLength(false);

    axios.get("https://restcountries.com/v2/all").then((response) => {
      let countries = response.data;
      let countriesNames = countries.map((country) =>
        country.name.toLowerCase()
      );
      // console.log(countriesNames);

      let filteredCountries;
      filteredCountries = countriesNames.filter((country) =>
        country.includes(searchVal)
      );

      setCountryNames(filteredCountries);

      if (filteredCountries.length > 10) setLength(true);
      else setLength(false);

      console.log(length);
    });
  };

  useEffect(countriesHook, [searchVal, length]);

  return (
    <div>
      find countries
      <input type="text" value={searchVal} onChange={handleSearchChange} />
      <Final length={length} countryNames={countryNames} />
    </div>
  );
}

export default App;
