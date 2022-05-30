import axios from "axios";
import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import phone from "./services/phone";

let ErrorComponent = ({ message }) => {
  let addError =
  {
    color: 'red',
    background: 'lightgrey',
    fontsize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) return;

  else {
    if (message)
      return (
        <div style={addError}>{message}</div>
      )
  }
}

let SuccessComponent = ({ message }) => {
  let addSuccess = {
    color: "green",
    background: "lightgrey",
    fontsize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) return;
  return (
    <div style={addSuccess}>{message} has been added to the phonebook</div>
  );
};

let DeleteComponent = ({ message }) => {
  let addDelete = {
    color: "red",
    background: "lightgrey",
    fontsize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) return;
  return (
    <div style={addDelete}>
      {message} has been already removed from the server
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [delMsg, setDelMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null)

  let deleteContact = (id, name) => {
    let val = window.confirm("Delete " + name);
    if (val) {
      return axios
        .delete(`api/persons/${id}`)
        .then(setPersons(persons.filter((person) => person.id !== id)),
          setDelMsg(name),
          setTimeout(() => {
            setDelMsg(null);
          }, 4000)
        )
        .catch((err) => {
          setErrorMsg(err.response.data);
          setDelMsg(null)
          setTimeout(() => {
            setErrorMsg(null)
          }, 4000)

        });
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
    console.log(errorMsg);
    e.preventDefault();
    let update = false;
    let duplicate = false;
    let obj = { name: newName, phoneNumber: number };
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
            .put(`/api/persons/${updateId}`, obj)
            .then((response) => {
              console.log(response.data);
              setPersons(
                persons.map((person) =>
                  person.id !== updateId ? person : obj

                )

              );
            })
            .then(
              setSuccessMsg(obj.name),
              setTimeout(() => {
                setSuccessMsg(null);
              }, 4000),
              setNewName(""),
              setNumber("")

            ).catch((err) => {
              console.log(err);
              setSuccessMsg(null)
              setErrorMsg(err.response.data)

            })

          update = false;
        }
      }
    });

    if (!duplicate) {

      phone.addContact(obj).then((response) => {
        console.log(response.data);
      })
        .then(setPersons(persons.concat(obj)),
          setNewName(""),
          setNumber(""),
          setSuccessMsg(obj.name),
          setErrorMsg(null),
          setTimeout(() => {
            setSuccessMsg(null);
          }, 2000))
        .catch((err) => {
          console.log(err.response);
          setSuccessMsg(null)
          setErrorMsg(err.response.data)

          setTimeout(() => {
            setErrorMsg(null)
          }, 2000)
        })

    }


  };

  const showVals = () => {
    if (search === "") {
      return persons.map((person, index) => {
        return (
          <li key={index}>
            {person.name}:{person.phoneNumber}
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
            {person.name}:{person.phoneNumber}
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
      <SuccessComponent message={successMsg} />
      <DeleteComponent message={delMsg} />
      <ErrorComponent message={errorMsg} />
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

