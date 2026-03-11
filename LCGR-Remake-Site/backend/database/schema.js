const getDb = require('./db');

function createTables() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_section TEXT NOT NULL,
      image_url TEXT NOT NULL,
      alt_text TEXT,
      link_url TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS news_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      date TEXT,
      end_date TEXT,
      type TEXT NOT NULL CHECK(type IN ('news', 'event')),
      location TEXT,
      is_featured BOOLEAN DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS static_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_name TEXT NOT NULL,
      section_name TEXT NOT NULL,
      text_content TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(page_name, section_name)
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT,
      bio TEXT,
      image_url TEXT,
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      member_type TEXT DEFAULT 'staff' CHECK(member_type IN ('staff', 'board')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migration: add image_url to static_content if it doesn't exist
  const columns = db.prepare("PRAGMA table_info(static_content)").all();
  const hasImageUrl = columns.some((col) => col.name === 'image_url');
  if (!hasImageUrl) {
    db.exec("ALTER TABLE static_content ADD COLUMN image_url TEXT");
  }

  // Migration: add token_version, failed_attempts, locked_until to users if they don't exist
  const userColumns = db.prepare("PRAGMA table_info(users)").all();
  const userColNames = userColumns.map((col) => col.name);
  if (!userColNames.includes('token_version')) {
    db.exec("ALTER TABLE users ADD COLUMN token_version INTEGER DEFAULT 1");
  }
  if (!userColNames.includes('failed_attempts')) {
    db.exec("ALTER TABLE users ADD COLUMN failed_attempts INTEGER DEFAULT 0");
  }
  if (!userColNames.includes('locked_until')) {
    db.exec("ALTER TABLE users ADD COLUMN locked_until DATETIME");
  }

  console.log('Database tables created successfully.');
}

module.exports = createTables;
