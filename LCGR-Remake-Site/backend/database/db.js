const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', process.env.DB_PATH || './database/lcgr.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(dbPath);
    // Enable WAL mode for better concurrent read performance
    db.pragma('journal_mode = WAL');
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
  }
  return db;
}

// Graceful shutdown
process.on('exit', () => {
  if (db) db.close();
});

module.exports = getDb;
