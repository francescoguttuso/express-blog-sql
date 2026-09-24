import mysql from "mysql2/promise.js";

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog",
});

console.log("Database connesso!");
