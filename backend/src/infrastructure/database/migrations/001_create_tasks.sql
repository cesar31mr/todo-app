CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL CHECK(length(title) <= 200),
  description TEXT,
  completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT(datetime('now')),
  updated_at TEXT NOT NULL DEFAULT(datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);