import express from "express";
import { connection } from "./db.js";

const app = express();

app.get("/posts", async (req, res) => {
  const [results] = await connection.query("SELECT * FROM posts");

  res.json(results);
});

app.delete("/posts/:id", async (req, res) => {
  const [results] = await connection.query("DELETE FROM posts WHERE id = ?", [
    req.params.id,
  ]);

  res.sendStatus(204);
});

app.get("/posts/:id", async (req, res) => {
  const [results] = await connection.query("SELECT * FROM posts WHERE id = ?", [
    req.params.id,
  ]);

  res.json(results);
});

app.get("/posts/:id", async (req, res) => {
  const [results] = await connection.query(
    `
    SELECT
      posts.id,
      posts.title,
      tags.label
    FROM posts
    JOIN post_tag
      ON posts.id = post_tag.post_id
    JOIN tags
      ON post_tag.tag_id = tags.id
    WHERE posts.id = ?
  `,
    [req.params.id],
  );

  res.json(results);
});

app.listen(3000, () => {
  console.log("Server avviato sulla porta 3000");
});
