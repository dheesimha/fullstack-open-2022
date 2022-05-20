import axios from "axios";
import React, { useEffect, useState } from "react";

function Final({ length, countryNames, countryObj }) {
  let finalCountry;
  if (length === true) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return countryNames.map((country) => {
      if (countryNames.length > 1) {
        return <li key={country}>{country}</li>;
      } else {
        finalCountry = countryObj.filter(
          (c) => c.name.toLowerCase() === country
        );

        return (
          <div key={country}>
            <h1>{country}</h1>
            <br />

            <p>Capital : {finalCountry[0].capital}</p>
            <p>Area : {finalCountry[0].area}</p>

            <br />

            <h2>Languages</h2>
            {finalCountry[0].languages.map((language) => {
              return <p key={language.name}>{language.name}</p>;
            })}
            <img src={finalCountry[0].flags.png} alt={country} />
          </div>
        );
      }
    });
  }
}

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [length, setLength] = useState(false);
  const [countryObj, setCountryObj] = useState([]);

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

      setCountryObj(countries);

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
      <Final
        length={length}
        countryNames={countryNames}
        countryObj={countryObj}
      />
    </div>
  );
}

export default App;
