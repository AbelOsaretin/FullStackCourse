import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  console.log("effect");
  const request = axios.get(baseUrl);
  console.log("Get All Contact Promise Fulfilled");
  return request.then((response) => response.data);
};

const addContact = (newPersonObj) => {
  const request = axios.post(baseUrl, newPersonObj);
  console.log("Add Contact Promise Fulfilled");
  return request.then((response) => response.data);
};

export default { getAll, addContact };
