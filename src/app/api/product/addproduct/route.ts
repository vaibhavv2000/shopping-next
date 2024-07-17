import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req:NextRequest) {
 const {type,name,description,image,price} = await req.json();

 if(!type || !name || !description || !image || !price) {
  return NextResponse.json({message: "All fields are required"},{status:400});
 };

 try {
  const add = await pg.query(
   `INSERT INTO products (product_name, type, description, image, price) 
    VALUES ($1, $2 ,$3, $4, $5)`,
   [name,type,description,image,price]
  );
  
  return NextResponse.json("Added",{status:201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};