import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust to your backend URL
});

export default instance;
