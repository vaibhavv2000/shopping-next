import {Client} from "pg";

const pg = new Client({
 host: "pg-1a6da4a3-vaibhavk1965-e15c.i.aivencloud.com",
 user: "avnadmin",
 database: "defaultdb",
 port: 10758,
 password: "AVNS_Is_cElUofI7Gwo4eFEA",
 ssl: {
  rejectUnauthorized: false,
 },
});

pg.connect();

pg.on("error",(err) => console.log(err));

export default pg;