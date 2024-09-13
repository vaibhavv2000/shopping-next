import pg from "./pg";
import addProducts from "./productsList";

const users = `
 CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(500) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL,
  wishlist TEXT [],
  myOrders TEXT [],
  orderHistory TEXT [],
  CONSTRAINT users_email_idx UNIQUE (email)
)`;

const products = `
 CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(1000) NOT NULL,
  price INT NOT NULL,
  description VARCHAR(3000),
  image VARCHAR(20000) NOT NULL,
  type VARCHAR(300),
  rating FLOAT DEFAULT 4.0
)`;

const product_type = `CREATE TYPE category_type AS ENUM ('order','wish','history')`;

const userdata = `
 CREATE TABLE IF NOT EXISTS userdata (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT,
  category category_type NOT NULL,
  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const generateTables = async () => {
 try {
  await pg.query(users);
  await pg.query(products);
  await pg.query(product_type);
  await pg.query(userdata);
  await addProducts();
  console.log("Tables created successfully");
 } catch (error) {
  console.log("Error creating tables:", error);
 }
};

export default generateTables;