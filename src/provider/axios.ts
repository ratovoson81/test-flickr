import axios from "axios";
import { URL_API } from "../constants/config";

const api = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
