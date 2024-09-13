import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
 const {id, name, email} = getUser() as user;

 if(!id) {
  cookies().delete("shopping-user");
  return NextResponse.json({success: false},{status: 401});
 };

 try {
  let query = "SELECT wishlist FROM users WHERE id = $1";
  const {rows: [{wishlist}]} = await pg.query(query, [id]);
  return NextResponse.json({name, email, id, wishlist},{status: 200});
 } catch (error) {
  return NextResponse.json(error,{status: 500});
 };
};