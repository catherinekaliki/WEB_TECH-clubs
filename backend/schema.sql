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
);

INSERT INTO clubs (name, category, president, member_count, meeting_day, budget) VALUES
('Computer Science Club', 'Academic', 'Alice Mwansa', 45, 'Friday', 500.00),
('Engineering Society', 'Academic', 'John Phiri', 60, 'Wednesday', 750.00),
('Campus Football Club', 'Sports', 'Michael Banda', 30, 'Monday', 300.00),
('Drama & Arts Guild', 'Cultural', 'Sarah Zulu', 25, 'Thursday', 200.00),
('Debate League', 'Academic', 'Emmanuel Tembo', 15, 'Tuesday', 150.00),
('Chess Masters', 'Sports', 'Chipo Sakala', 20, 'Friday', 100.00),
('Eco-Green Warriors', 'Environmental', 'Grace Mubanga', 35, 'Saturday', 400.00),
('Music & Choir Club', 'Cultural', 'David Ndhlovu', 50, 'Tuesday', 600.00),
('Rotaract Community', 'Service', 'Mercy Kazoka', 40, 'Wednesday', 450.00),
('Entrepreneurship Hub', 'Business', 'Kelvin Lungu', 28, 'Thursday', 350.00);