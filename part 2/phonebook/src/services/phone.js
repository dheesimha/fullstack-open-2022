import axios from "axios";
const url = "http://localhost:3001/persons";

let getContacts = () => {
  return axios.get(url);
};

let addContact = (obj) => {
  return axios.post(url, obj);
};

export default {
  getContacts,
  addContact,
};
