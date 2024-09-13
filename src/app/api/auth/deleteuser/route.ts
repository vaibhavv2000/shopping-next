import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function DELETE() {
 const {id} = getUser() as user;
 if(!id) return NextResponse.json({message: "Unauthorized"}, {status: 401}); 

 try {
  await pg.query(`DELETE FROM users WHERE id = $1`, [id]);
  cookies().delete("shopping-user");
  return NextResponse.json({success: true},{status: 200});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 };
};