import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwerty_1985",
  database: "blog",
});

console.log("Database connesso!");
