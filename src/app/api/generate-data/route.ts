import pg from "@/lib/pg";
import {addProducts} from "@/lib/productsList";
import {NextResponse} from "next/server";

const db = `
 DO $$
  BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'shopping') THEN
    PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE shopping');
   END IF;
  END
 $$
`;

const users = `
 CREATE TABLE IF NOT EXISTS users (
  id serial,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(500) NOT NULL UNIQUE,
  password VARCHAR(455) NOT NULL,
  wishlist TEXT [],
  my_orders TEXT [],
  order_history TEXT [],
  PRIMARY KEY (id)
)`;
 
const user_index = `CREATE UNIQUE INDEX email_index ON users (email)`;
 
const products = `
 CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(1000) NOT NULL,
  price INT NOT NULL,
  description VARCHAR(3000),
  image VARCHAR(20000) NOT NULL,
  type VARCHAR(300),
  rating FLOAT DEFAULT 4.0
)`;

const product_index = `CREATE INDEX pro_in ON products(id)`;

const product_type = `CREATE TYPE product_type AS ENUM ('order','wish','history')`;

const userdata = `CREATE TABLE userdata (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT,
  type product_type NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
)`;

export async function GET() { 
 try {
//   await pg.query("CREATE  DATABASE shopping");
//   await pg.query(users);
//   await pg.query(user_index);
//   await pg.query(products);
//   await pg.query(product_index);
//   await pg.query(product_type);
//   await pg.query(userdata);
//   addProducts();

  return NextResponse.json("Data created",{status: 201});
 } catch (error) {
  return NextResponse.json(error,{status:500}); 
 };
};