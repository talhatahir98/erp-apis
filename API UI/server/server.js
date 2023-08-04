// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace the database connection configuration with your XAMPP MySQL credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "accounting",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");
});

// APIs for Item
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO items (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add item" });
    } else {
      res.status(201).json({ message: "Item added successfully" });
    }
  });
});

app.get("/api/items", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to get items" });
    } else {
      res.status(200).json(result);
    }
  });
});

// APIs for Account
app.post("/api/account", (req, res) => {
  const { name, description, accountType } = req.body;
  const query =
    "INSERT INTO account (name, description, account_type) VALUES (?, ?, ?)";
  db.query(query, [name, description, accountType], (err, result) => {
    if (err) {
      console.error("Error adding account:", err.message);
      res.status(500).json({ error: "Failed to add account" });
    } else {
      const accountId = result.insertId;
      res
        .status(200)
        .json({
          message: "Congratulation! Account added successfully",
          account: { id: accountId, name, description, accountType },
        });
    }
  });
});


// API endpoint to get all accounts
app.get('/api/account', (req, res) => {
  const sql = 'SELECT * FROM Account';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get accounts' });
    } else {
      res.status(200).json(result);
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
