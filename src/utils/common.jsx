import axios from "axios";

export default axios.create({
  baseURL: "https://api.kkpus.id",
  // baseURL: "https://localhost:3000",
  withCredentials: true,
});
