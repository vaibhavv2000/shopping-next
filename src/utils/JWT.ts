import jwt from "jsonwebtoken";
import {cookies, headers} from "next/headers";
import type {user} from "./types";

const JWT = {
 sign(payload: object): string {
  return jwt.sign(
   payload, 
   process.env.JWT_TOKEN as string, 
   {expiresIn: "30d"}
  );
 },
};

export const getUser = () => {
 let cookie = cookies().get("shopping-user")?.value;
 let token = headers().get('Authorization')?.split(" ")[1] as string;
 if(!cookie && !token) return {};
 const user = jwt.decode(cookie || token) as user;
 return user;
};

export default JWT;