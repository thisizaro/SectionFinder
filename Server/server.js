const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

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

// Helper function to handle database errors
function handleDbError(res, err) {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
}

// Route to get comments for a specific post
app.get("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  db.all(
    "SELECT comment, rating FROM comments WHERE postId = ?",
    [postId],
    (err, rows) => {
      if (err) return handleDbError(res, err);
      res.json(rows);
    }
  );
});

// Route to post a comment for a specific post
app.post("/api/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { comment, rating } = req.body;

  db.run(
    "INSERT INTO comments (postId, comment, rating) VALUES (?, ?, ?)",
    [postId, comment, rating],
    function (err) {
      if (err) return handleDbError(res, err);
      // Retrieve updated comments list after insertion
      db.all(
        "SELECT comment, rating FROM comments WHERE postId = ?",
        [postId],
        (err, rows) => {
          if (err) return handleDbError(res, err);
          res.json(rows);
        }
      );
    }
  );
});

// Route to get the average rating for a specific post
app.get("/api/posts/:id/rating", (req, res) => {
  const postId = req.params.id;
  db.get(
    "SELECT AVG(rating) AS averageRating FROM comments WHERE postId = ?",
    [postId],
    (err, row) => {
      if (err) return handleDbError(res, err);
      res.json({ averageRating: row.averageRating });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
