import axios from "axios";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const API = axios.create({
 baseURL: "http://localhost:3000/api",
});