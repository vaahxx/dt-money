import axios from "axios";

export const api = axios.create({
  baseURL: "https://nodejs-transactions-api-mlrg.onrender.com/",
  withCredentials: true,
});
