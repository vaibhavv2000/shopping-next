import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {productId,userId} = await req.json();

 try {
  await pg.query(
   `INSERT INTO userdata (userId, productId, type) VALUES ($1, $2, $3)`,
   [userId,productId,"wish"]
  );

  return NextResponse.json("Added",{status:201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};