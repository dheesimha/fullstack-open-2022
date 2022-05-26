import axios from "axios";
import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import phone from "./services/phone";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  let deleteContact = (id, name) => {
    let val = window.confirm("Delete " + name);
    if (val) {
      return axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };
  useEffect(() => {
    phone.getContacts().then((response) => setPersons(response.data));
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
    let update = false;
    let duplicate = false;
    let obj = { name: newName, number: number };
    let updateId;
    persons.forEach((person) => {
      if (person.name === obj.name) {
        updateId = person.id;
        update = window.confirm(
          `${obj.name} already added to the phonebook ,replace the old number with a new one ? `
        );
        duplicate = true;

        if (update === true && duplicate) {
          axios
            .put(`http://localhost:3001/persons/${updateId}`, obj)
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== updateId ? person : response.data
                )
              );
            });

          update = false;
        }
      }
    });

    if (!duplicate) {
      phone.addContact(obj).then((response) => {
        console.log(response.data);
      });
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
      // console.log(persons);
      return persons.map((person, index) => {
        return (
          <li key={index}>
            {person.name}:{person.number}
            <button onClick={() => deleteContact(person.id, person.name)}>
              Delete Contact
            </button>
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
            <button onClick={() => deleteContact(person.id)}>
              Delete Contact
            </button>
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
