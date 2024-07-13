const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Set up the SQLite database
const dbPath = path.join(__dirname, "comments.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            postId INTEGER,
            comment TEXT,
            rating INTEGER
        )
    `);
});

app.get("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  db.all(
    "SELECT comment, rating FROM comments WHERE postId = ?",
    [postId],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(rows);
    }
  );
});

app.post("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { comment, rating } = req.body;
  db.run(
    "INSERT INTO comments (postId, comment, rating) VALUES (?, ?, ?)",
    [postId, comment, rating],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      db.all(
        "SELECT comment, rating FROM comments WHERE postId = ?",
        [postId],
        (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          res.json(rows);
        }
      );
    }
  );
});

app.get("/api/posts/:id/rating", (req, res) => {
  const postId = req.params.id;
  db.get(
    "SELECT AVG(rating) as averageRating FROM comments WHERE postId = ?",
    [postId],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ averageRating: row.averageRating });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
