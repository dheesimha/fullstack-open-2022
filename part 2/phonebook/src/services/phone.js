import axios from "axios";
const url = "/api/persons";

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
