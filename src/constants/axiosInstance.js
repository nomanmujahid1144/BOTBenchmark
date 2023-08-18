import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:1212",
  // baseURL: "https://server.botbenchmark.com",
});
