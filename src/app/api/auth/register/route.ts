import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {jwt_key} from "../login/route";

export async function POST(req: NextRequest) {
 const {email,name,password} = await req.json();

 if(!name || !password || !email) {
  return NextResponse.json({message: "All fields are required"},{status: 400});
 };

 try {
  const get_user = await pg.query(
   `SELECT email FROM users WHERE email = $1`,
   [email]
  );

  if(get_user.rows[0]) {
   return NextResponse.json({message: "User already exists"},{status:400});
  };

  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(password,salt);

  const new_user = await pg.query(
   `INSERT INTO users (name, email, password) VALUES
   ($1, $2, $3) RETURNING id`,
   [name,email,hash]
  );

  const user = new_user.rows[0];

  const token = jwt.sign(
   {id: user.id,email: email},
   process.env.JWT_KEY || jwt_key as string,
   {expiresIn: "10d",}
  );

  const user_data = {email,name,id: user.id};

  return NextResponse.json({user: user_data,token},{status: 201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};