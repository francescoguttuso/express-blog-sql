import express from "express";
import { connection } from "./db.js";

const app = express();
app.use(express.json());

//Milestone 2:index
app.get("/posts", async (req, res) => {
  const [results] = await connection.query("SELECT * FROM posts");

  res.json(results);
});

// Milestone 3: Destroy
app.delete("/posts/:id", async (req, res) => {
  const [results] = await connection.query("DELETE FROM posts WHERE id = ?", [
    req.params.id,
  ]);

  // Se non sono state apportate modifiche di alcuna riga, il post non esiste
  
  if (results.affectedRows === 0) {
    return res.status(404).json({ error: "Post non trovato" });
  }

  res.sendStatus(204);
});

app.get("/posts/:id", async (req, res) => {
  const [results] = await connection.query("SELECT * FROM posts WHERE id = ?", [
    req.params.id,
  ]);

  res.json(results);
});

//Milestone 4: Show(singola rotta con estrazione [[results]])
app.get("/posts/:id", async (req, res) => {
   // Con [[results]] prendiamo direttamente il primo oggetto restituito dalla SELECT
const [[results]] = await connection.query(
    "SELECT * FROM posts WHERE id = ?",
    [req.params.id]
  );

  if (!results) {
    return res.status(404).json({ error: "Post non trovato" });
  }
  
  // Query per recuperare le tag collegate a questo post
  const [tags] = await connection.query(
    `
    SELECT tags.id, tags.label
    FROM tags
    JOIN post_tag ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
  `,
    [req.params.id]
  );

  // Aggiungiamo l'array delle tag all'oggetto del post
  results.tags = tags;

  res.json(results);
});


app.listen(3000, () => {
  console.log("Server avviato sulla porta 3000");
});
