import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {productId,userId} = await req.json();

 try {
  await pg.query(
   `DELETE FROM userdata WHERE type = $1 AND userId = $2 AND productId = $3`,
   ["wish",userId,productId]
  );

  return NextResponse.json("Removed",{status:201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};