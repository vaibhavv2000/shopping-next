import pg from "@/lib/pg";
import {type NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {validateEmail} from "@/lib/emailValidator";
import {cookies} from "next/headers";
import cookieOptions from "@/utils/cookieOptions";
import JWT from "@/utils/JWT";

export async function POST(req: NextRequest) {
 let {email,name,password} = await req.json();

 name = name.trim();
 email = email.trim();
 password = password.trim();

 if(!name || !password || !email)
  return NextResponse.json({message: "All fields are required"},{status: 400});

 if(name.length < 3)
  return NextResponse.json({message: "Name should have atleast 3 characters"},{status: 400});

 if(!validateEmail(email))
  return NextResponse.json({message: "Email is Invalid"},{status: 400});  

 if(password.length < 8)
  return NextResponse.json({message: "Password must have atleast 8 characters"},{status: 400});

 if(password.includes(" "))
  return NextResponse.json({message: "Password must not include spaces"},{status: 400});  

 try {
  const {rows: [isUser]} = await pg.query(`SELECT email FROM users WHERE email = $1`, [email]);

  if(isUser) return NextResponse.json({message: "Email already exists"},{status:400});

  const salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(password,salt);

  const {rows: [{id}]} = await pg.query(
   `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
   [name,email,hash]
  );

  const token = JWT.sign({id, name, email});

  cookies().set("shopping-user", token, cookieOptions);

  return NextResponse.json({user: {id, name, email},token},{status: 201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};