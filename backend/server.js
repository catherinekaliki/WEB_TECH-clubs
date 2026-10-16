const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. GET ALL CLUBS
app.get("/api/clubs", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clubs");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ONE CLUB BY ID
app.get("/api/clubs/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clubs WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Club not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST - CREATE A NEW CLUB
app.post("/api/clubs", async (req, res) => {
  const { name, category, president, member_count, meeting_day, budget } =
    req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO clubs (name, category, president, member_count, meeting_day, budget) VALUES (?, ?, ?, ?, ?, ?)",
      [name, category, president, member_count, meeting_day, budget],
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "Club created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT - UPDATE A CLUB
app.put("/api/clubs/:id", async (req, res) => {
  const { name, category, president, member_count, meeting_day, budget } =
    req.body;
  try {
    const [result] = await db.query(
      "UPDATE clubs SET name = ?, category = ?, president = ?, member_count = ?, meeting_day = ?, budget = ? WHERE id = ?",
      [
        name,
        category,
        president,
        member_count,
        meeting_day,
        budget,
        req.params.id,
      ],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Club not found" });
    res.json({ message: "Club updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE - REMOVE A CLUB
app.delete("/api/clubs/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM clubs WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Club not found" });
    res.json({ message: "Club deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
