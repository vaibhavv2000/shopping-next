import axios from "axios";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "shopping-next-ivory.vercel.app";

export const API = axios.create({
 baseURL: `${URL}/api`,
});