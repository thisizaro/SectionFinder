const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

console.log("Starting server...");

app.get("/", (req, res) => {
  console.log("Received request at root path");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
