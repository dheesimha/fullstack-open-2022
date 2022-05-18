import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

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
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
          number : <input value={number} onChange={numberChange} />
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
