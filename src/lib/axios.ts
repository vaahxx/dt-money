import axios from "axios";

export const api = axios.create({
  // baseURL: "https://nodejs-transactions-api-mlrg.onrender.com/",
  baseURL: "http://localhost:3333/",
  withCredentials: true,
});
