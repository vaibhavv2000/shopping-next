import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {NextResponse} from "next/server";

export async function POST() {
 const {id} = getUser() as user;
 if(!id) return NextResponse.json({message: "Unauthorized"}, {status: 401});

 try {
  await pg.query(`UPDATE userdata SET category = $1 WHERE userId = $2`,["history", id]);
  return NextResponse.json({success: true},{status:200});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};