import axios from "axios";

let host = "https://shopping-next-ivory.vercel.app";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : host;

export const API = axios.create({
 baseURL: `${URL}/api`,
 withCredentials: true,
});