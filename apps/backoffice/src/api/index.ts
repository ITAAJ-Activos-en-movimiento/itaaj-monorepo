import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export const itaajApi = axios.create({
  baseURL: VITE_API_URL,
});
