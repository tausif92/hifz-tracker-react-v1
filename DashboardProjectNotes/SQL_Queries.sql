-- Add columns in the DB table
ALTER TABLE progress ADD COLUMN user_id INTEGER;
ALTER TABLE activity_log ADD COLUMN user_id INTEGER;
ALTER TABLE para_surah ADD COLUMN user_id INTEGER;
ALTER TABLE users ADD COLUMN currentPara TEXT;

UPDATE users SET currentPara = 'Para 30' WHERE id = 1;
UPDATE users SET currentPara = 'Para 30' WHERE email = "user@user.com";

DELETE FROM progress WHERE user_id = 1;
DELETE FROM users WHERE id = 2;
DELETE FROM progress
DELETE FROM users
DELETE FROM para_surah
DELETE FROM activity_log

-- Select queries
SELECT * FROM progress
SELECT * FROM activity_log
SELECT * FROM para_surah
SELECT * FROM users

DROP TABLE IF EXISTS progress;

DROP TABLE IF EXISTS variables;

CREATE TABLE progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  para TEXT NOT NULL,
  completed_pages INTEGER NOT NULL DEFAULT 0,
  total_pages INTEGER NOT NULL,
  start_date TEXT,
  end_date TEXT,
  UNIQUE(user_id, para),
  FOREIGN KEY(user_id) REFERENCES users(id)
);


