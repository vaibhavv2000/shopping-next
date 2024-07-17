import pg from "@/lib/pg";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
 const id = req.nextUrl.searchParams.get("id");

 try {
  const {rows} = await pg.query(`SELECT * FROM userdata WHERE userid = $1`, [id]);

  const wish = rows.filter(p => p.type === "wish");
  const order = rows.filter(p => p.type === "order");
  const history = rows.filter(p => p.type === "history");

  const getData = async (arr: any[]) => {
   return await Promise.all(arr.map(async p => {
    const {rows} = await pg.query(`SELECT * FROM products WHERE id = $1`,[p.productid]);
    return rows[0];
   }));
  };

  const wishlist = await getData(wish);

  const historylist = await Promise.all(history.map(async p => {
   const {rows} = await pg.query(`SELECT * FROM products WHERE id = $1`,[p.productid]);
   return {...rows[0], quantity: p.quantity};
  }));;

  const orderlist =  await Promise.all(order.map(async p => {
   const {rows} = await pg.query(`SELECT * FROM products WHERE id = $1`,[p.productid]);
    return {...rows[0], quantity: p.quantity};
  }));;

  return NextResponse.json({wishlist,orderlist,historylist},{status: 200});
 } catch(error) {
  return NextResponse.json(error, {status: 500});
 };
};