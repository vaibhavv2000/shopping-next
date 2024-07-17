import pg from "@/lib/pg";
import {NextResponse} from "next/server";

export async function GET() {
 try {
  const {rows} = await pg.query(`SELECT * FROM products`);
  return NextResponse.json(rows,{status:200});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};