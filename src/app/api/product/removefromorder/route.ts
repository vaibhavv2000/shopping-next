import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {productId,userId,del} = await req.json();

 try {
  if(del) {
   await pg.query(
    `DELETE FROM userdata WHERE 
    type = $1 AND userId = $2 AND productId = $3`,
    ["order",userId,productId]
   );

   return NextResponse.json("deleted",{status:200});
  };

  await pg.query(
   `UPDATE userdata SET quantity = quantity - 1
    WHERE type = $1 AND userId = $2 AND productId = $3`,
    ["order",userId,productId]
  );

  return NextResponse.json("updated",{status:200});
 } catch(error) {
  return NextResponse.json(error, {status: 500});
 };
};