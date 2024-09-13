import {Pool} from "pg";

const local = {
 host: "localhost",
 user: "postgres",
 port: 5432,
 password: process.env.LOCAL_DB_PASSWORD,
 database: "shopping",
};

const prod = {
 connectionString: process.env.POSTGRES_URL,
 ssl: {rejectUnauthorized: false,},
};

const config = process.env.NODE_ENV === "development" ? local : prod;

const pg = new Pool(config);

pg.connect(() => console.log("CONNECTED DB"));

pg.on("error",(err) => console.log(err));

export default pg;