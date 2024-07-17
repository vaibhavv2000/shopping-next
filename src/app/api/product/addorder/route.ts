import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {productId,userId,incr,decr} = await req.json();

 try {
  if(incr) {
   await pg.query(
    `UPDATE userdata SET quantity = quantity + 1 WHERE 
    type = $1 AND userId = $2 AND productId = $3`,
    ["order",userId,productId]
   );
       
   return NextResponse.json("Increased Quantity",{status:201});
  };
  
  if(decr) {
   await pg.query(
    `UPDATE userdata SET quantity = quantity - 1 WHERE 
    type = $1 AND userId = $2 AND productId = $3`,
    ["order",userId,productId]
   );
   
   return NextResponse.json("Decreased Quantity",{status:200});
  };
  
  const {rows} = await pg.query(
   `SELECT * FROM userdata WHERE 
    type = $1 AND userId = $2 AND productId = $3`,
    ["order",userId,productId]
  );
  
  if(!rows[0]) {
   await pg.query(
    `INSERT INTO userdata (userId, productId, type, quantity) 
    VALUES ($1, $2, $3, $4)`,
    [userId,productId,"order",1]
   );
  }
  
  return NextResponse.json("Added",{status:201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 }
};