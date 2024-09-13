import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {validateEmail} from "@/lib/emailValidator";
import {cookies} from "next/headers";
import cookieOptions from "@/utils/cookieOptions";
import JWT from "@/utils/JWT";

export async function POST(req: NextRequest) {
 let {email, password} = await req.json();

 email = email.trim();
 password = password.trim();

 if(!password || !email)
  return NextResponse.json({message: "All fields are required"}, {status:400});

 if(!validateEmail(email))
  return NextResponse.json({message: "Email is Invalid"}, {status: 400});

 if(password.includes(" "))
  return NextResponse.json({message: "Password should not include space"}, {status: 400});

 if(password.length < 8) 
  return NextResponse.json({message: "Password must have 8 characters"}, {status: 400});

 let query = `SELECT name, email, id, password FROM users WHERE email = $1`;

 try {
  const {rows: [user]} = await pg.query(query, [email]);
  if(!user) return NextResponse.json({message: `No user found found with ${email}`},{status: 404});

  const isCorrect: boolean = await bcrypt.compare(password,user.password);
  if(!isCorrect) return NextResponse.json({message: "Email or Password is wrong"},{status:400});

  let data = {id: user.id, email, name: user.name};
  const token = JWT.sign(data);
  cookies().set("shopping-user", token, cookieOptions);

  return NextResponse.json({user: data,token},{status:200});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};