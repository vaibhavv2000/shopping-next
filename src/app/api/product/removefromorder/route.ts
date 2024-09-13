import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {type NextRequest, NextResponse} from "next/server";

export async function DELETE({nextUrl}: NextRequest) {
 const {id} = getUser() as user;
 const productId = nextUrl.searchParams.get("id");
 const del = nextUrl.searchParams.get("del");

 if(!id || !productId) return NextResponse.json({message: "Unauthorized"}, {status: 401});

 try {
  if(del) {
   await pg.query(
    `DELETE FROM userdata WHERE category = $1 AND userId = $2 AND productId = $3`,
    ["order", id, Number(productId)]
   );
  } else {
   await pg.query(
    `UPDATE userdata SET quantity = quantity - 1
     WHERE category = $1 AND userId = $2 AND productId = $3`,
    ["order", id, Number(productId)]
   );
  };

  return NextResponse.json({success: true}, {status: 200});
 } catch(error) {
  return NextResponse.json(error, {status: 500});
 };
};