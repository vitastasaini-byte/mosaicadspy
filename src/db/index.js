import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let dbInstance = null;

export async function getDb() {
    if (dbInstance) return dbInstance;

    const dbPath = path.resolve(process.cwd(), 'data', 'mie.db');

    // Ensure the data directory exists
    const fs = await import('fs');
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    dbInstance = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    // Create tables if they don't exist
    await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS ads (
      id TEXT PRIMARY KEY,
      brand TEXT,
      competitor TEXT,
      start_date TEXT,
      media_type TEXT,
      ad_copy TEXT,
      first_seen TEXT,
      last_seen TEXT,
      is_active INTEGER DEFAULT 1,
      theme TEXT
    )
  `);

    return dbInstance;
}
