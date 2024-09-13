import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {type NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
 const {id} = getUser() as user;
 const {productId,incr,decr} = await req.json();

 if(!id || !productId) return NextResponse.json({message: "Unauthorized"},{status: 401});

 try {
  if(incr || decr) {
   let query = `UPDATE userdata SET quantity = quantity ${incr ? "+" : "-"} 1 WHERE category = $1 AND userId = $2 AND productId = $3`;
   await pg.query(query, ["order", id, productId]);
   return NextResponse.json({success: true}, {status:201});
  };
  
  const {rows: [product]} = await pg.query(
   `SELECT id FROM userdata WHERE category = $1 AND userId = $2 AND productId = $3`,
   ["order", id, productId]
  );

  if(!product) {
   await pg.query(
    `INSERT INTO userdata (userId, productId, category, quantity) VALUES ($1, $2, $3, $4)`,
    [id, productId, "order", 1]
   );
  };

  return NextResponse.json({success: true},{status:201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};