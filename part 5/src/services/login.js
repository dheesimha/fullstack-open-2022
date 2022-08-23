import axios from "axios";

const baseUrl = "/api/login";

const login = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl, credentials);

  return response.data;
};

let services = { login };

export default services;
