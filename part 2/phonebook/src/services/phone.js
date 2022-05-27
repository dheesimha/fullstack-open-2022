import axios from "axios";
const url = "https://dhee-fs-backend.herokuapp.com/api/persons";

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
