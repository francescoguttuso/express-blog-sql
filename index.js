import express from "express";
import { connection } from "./db.js";

const app = express();

app.get("/posts", async (req, res) => {
  const [results] = await connection.query("SELECT * FROM posts");

  res.json(results);
});

app.listen(3000, () => {
  console.log("Server avviato sulla porta 3000");
});
