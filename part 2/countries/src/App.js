import axios from "axios";
import React, { useEffect, useState } from "react";

function Individual({ countryObj, name }) {
  // console.log(countryObj);
  let req = countryObj.filter(
    (country) => country.name.toLowerCase() === name.toLowerCase()
  );

  // console.log(req);
  let weatherData;

  let lat = req[0].latlng[0];
  let lon = req[0].latlng[1];

  const [weather, setWeather] = useState({});

  let getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_APPID}`
      )
      .then((response) => {
        weatherData = response.data;
        setWeather({
          temp: weatherData.main.temp,
          icon: weatherData.weather[0].icon,
          wind: weatherData.wind.speed,
        });
      });
  };

  useEffect(getWeather, [lat, lon, weather]);
  return (
    <div>
      <h1>{req[0].name}</h1>
      <p>Capital {req[0].capital}</p>
      <p>Area {req[0].area}</p>
      <h2>Languages</h2>
      {req[0].languages.map((language) => {
        return <p key={language.name}>{language.name}</p>;
      })}

      <img src={req[0].flag} alt={req[0].name} width="200px" height="150px" />

      <br />
      <h1>Weather in {req[0].capital}</h1>
      <p>temperatue is {weather.temp} degree Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
      />
      <p>Wind {weather.wind} m/s</p>
    </div>
  );
}

function Final({ length, countryNames, countryObj }) {
  const [clicked, setClicked] = useState(false);
  const [clickedCountry, setClickedCountry] = useState("");
  let showCountry = (name) => {
    console.log("Before func ", clicked);
    console.log("executing the func");

    setClicked(!clicked);
    setClickedCountry(name);

    console.log(name, clicked);
    return clicked ? <Individual name={name} /> : null;
  };
  let finalCountry = [];
  let i = 0;
  let j;

  if (length === true) {
    return <p>Too many matches, specify another filter</p>;
  } else if (length === false) {
    for (i = 0; i < countryNames.length; i++) {
      for (j = 0; j < countryObj.length; j++) {
        if (countryObj[j].name.toLowerCase() === countryNames[i]) {
          finalCountry.push(countryObj[j]);
        }
      }
    }
    return finalCountry.map((country) => {
      return (
        <div key={country.name + "maindiv"}>
          <div key={country.name + "div"}>
            <li key={country.name}>
              {country.name} &nbsp;
              <button
                key={country.name + "button"}
                onClick={() => showCountry(country.name)}
              >
                show
              </button>
              {clicked && clickedCountry === country.name ? (
                <Individual countryObj={countryObj} name={country.name} />
              ) : null}
            </li>
          </div>
        </div>
      );
    });
  } else if (clicked === true) {
    <Individual />;
  }
}

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [length, setLength] = useState(false);
  const [countryObj, setCountryObj] = useState([]);
  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  let countriesHook = () => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      let countries = response.data;
      let countriesNames = countries.map((country) =>
        country.name.toLowerCase()
      );

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
