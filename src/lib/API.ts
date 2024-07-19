import axios from "axios";

let host = "shopping-next-ivory.vercel.app";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const API = axios.create({
 baseURL: `${URL}/api`,
});