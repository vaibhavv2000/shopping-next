import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {userId} = await req.json();

 try {
  await pg.query(`UPDATE userdata SET type = $1 WHERE userid = $2`,["history",userId]);
  
  return NextResponse.json("ok",{status:200});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};