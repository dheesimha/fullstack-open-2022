import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let duplicate = false;
    let obj = { name: newName, number: number };
    persons.forEach((person) => {
      if (person.name === obj.name) {
        alert(`${person.name} already exists`);
        duplicate = true;
      }
    });

    if (!duplicate) {
      setPersons(persons.concat(obj));
      setNewName("");
      setNumber("");
    } else {
      setNewName("");
      setNumber("");
    }
  };

  const showVals = () => {
    if (search === "") {
      console.log(persons);
      return persons.map((person, index) => {
        return (
          <li key={index}>
            {person.name}:{person.number}
          </li>
        );
      });
    } else {
      let newArr;
      newArr = persons.filter((person) =>
        person.name.toLowerCase().includes(search)
      );
      return newArr.map((person, index) => {
        return (
          <li key={index}>
            {person.name}:{person.number}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <Contact value={search} onChange={handleSearch} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <Contact value={newName} onChange={handleChange} />
          number:
          <Contact value={number} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{showVals()}</ul>
    </div>
  );
};

export default App;
