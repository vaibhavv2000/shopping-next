import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {type NextRequest, NextResponse} from "next/server";

export async function PUT({nextUrl}: NextRequest) {
 const {id} = getUser() as user;
 const productId = nextUrl.searchParams.get("id");
 const add = nextUrl.searchParams.get("add");

 if(!id || !productId) return NextResponse.json({message: "Unauthorized"}, {status: 401});

 try {
  if(add) {
   await pg.query(
    `INSERT INTO userdata (userId, productId, category) VALUES ($1, $2, $3)`,
    [id, Number(productId), "wish"]
   ); 
  } else {
   await pg.query(
    `DELETE FROM userdata WHERE category = $1 AND userId = $2 AND productId = $3`,
    ["wish", id, Number(productId)]
   );
  };

  return NextResponse.json({success: true}, {status: 201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};