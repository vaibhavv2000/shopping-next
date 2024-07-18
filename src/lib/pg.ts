import {Client} from "pg";

const {DB_HOST, DB_USER, DB_NAME, DB_PORT, DB_PWD} = process.env;

const pg = new Client({
 host: DB_HOST,
 user: DB_USER,
 database: DB_NAME,
 port: Number(DB_PORT),
 password: DB_PWD,
 ssl: {
  rejectUnauthorized: false,
 },
});

pg.connect();

pg.on("error",(err) => console.log(err));

export default pg;