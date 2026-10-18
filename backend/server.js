const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// 1. GET ALL CLUBS
app.get("/api/clubs", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM clubs").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ONE CLUB BY ID
app.get("/api/clubs/:id", (req, res) => {
  try {
    const club = db.prepare("SELECT * FROM clubs WHERE id = ?").get(req.params.id);

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST - CREATE A NEW CLUB
app.post("/api/clubs", (req, res) => {
  const { name, category, president, member_count, meeting_day, budget } = req.body;

  try {
    const result = db.prepare(`
      INSERT INTO clubs
      (name, category, president, member_count, meeting_day, budget)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, category, president, member_count, meeting_day, budget);

    res.status(201).json({
      id: result.lastInsertRowid,
      message: "Club created successfully!"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT - UPDATE A CLUB
app.put("/api/clubs/:id", (req, res) => {
  const { name, category, president, member_count, meeting_day, budget } = req.body;

  try {
    const result = db.prepare(`
      UPDATE clubs
      SET name = ?, category = ?, president = ?,
          member_count = ?, meeting_day = ?, budget = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name, category, president,
      member_count, meeting_day, budget,
      req.params.id
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json({ message: "Club updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE - REMOVE A CLUB
app.delete("/api/clubs/:id", (req, res) => {
  try {
    const result = db.prepare("DELETE FROM clubs WHERE id = ?").run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json({ message: "Club deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});