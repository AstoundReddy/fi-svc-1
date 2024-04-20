import axios from "axios";
import Cookies from "js-cookie";

const local = "http://localhost:5000/";
const proxy = "https://orderaheadproxyserver.azurewebsites.net/";
const BASE_URL = local;

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  console.log(config.data, "config.data");
  console.log(config.url, "config.url");
  if (!config.url.endsWith("/login") && !config.url.endsWith("/register")) {
    const token = JSON.parse(Cookies.get("user")).jwt;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
export default apiInstance;
