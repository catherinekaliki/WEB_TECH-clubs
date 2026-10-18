const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "campus_crud.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS clubs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    president TEXT NOT NULL,
    member_count INTEGER DEFAULT 0,
    meeting_day TEXT,
    budget REAL DEFAULT 0.00,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const clubCount = db.prepare("SELECT COUNT(*) AS total FROM clubs").get().total;

if (clubCount === 0) {
  const insertClub = db.prepare(`
    INSERT INTO clubs
    (name, category, president, member_count, meeting_day, budget)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const clubs = [
    ["Computer Science Club", "Academic", "Alice Mwansa", 45, "Friday", 500],
    ["Engineering Society", "Academic", "John Phiri", 60, "Wednesday", 750],
    ["Campus Football Club", "Sports", "Michael Banda", 30, "Monday", 300],
    ["Drama & Arts Guild", "Cultural", "Sarah Zulu", 25, "Thursday", 200],
    ["Debate League", "Academic", "Emmanuel Tembo", 15, "Tuesday", 150],
    ["Chess Masters", "Sports", "Chipo Sakala", 20, "Friday", 100],
    ["Eco-Green Warriors", "Environmental", "Grace Mubanga", 35, "Saturday", 400],
    ["Music & Choir Club", "Cultural", "David Ndhlovu", 50, "Tuesday", 600],
    ["Rotaract Community", "Service", "Mercy Kazoka", 40, "Wednesday", 450],
    ["Entrepreneurship Hub", "Business", "Kelvin Lungu", 28, "Thursday", 350]
  ];

  const seedClubs = db.transaction((items) => {
    for (const club of items) {
      insertClub.run(...club);
    }
  });

  seedClubs(clubs);
}

module.exports = db;