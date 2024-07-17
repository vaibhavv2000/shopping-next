import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export let jwt_key = "1nx8wg7wtc9picwkmn82ghbncw";

export async function POST(req: NextRequest) {
 const {email, password} = await req.json();

 if(!password || !email) {
  return NextResponse.json({message: "All fields are required"},{status:400});
 };
  
 try {
  const user = await pg.query(
  `SELECT name, email, id, password FROM users WHERE email = $1`,
   [email]
  );
  
  if(!user.rows[0]) return NextResponse.json({message: "No user found"},{status: 404});
  
  const pwd: boolean = await bcrypt.compare(password,user.rows[0].password);
  
  if(!pwd) return NextResponse.json({message: "Wrong PWD"},{status:400});
  
  let u = user.rows[0];
  
  const token = jwt.sign(
   {id: u.id,email: email},
   process.env.JWT_KEY || jwt_key as string,
   { expiresIn: "30d",}
  );
  
  const user_data = {email,name: u.name,id: u.id};
  
  return NextResponse.json({user: user_data,token},{status:200});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 }
}