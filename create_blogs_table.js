const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

try {
    console.log('Creating blogs table...');
    db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      coverImage TEXT NOT NULL,
      publishedAt TEXT NOT NULL,
      author TEXT NOT NULL
    )
  `);
    console.log('Successfully created blogs table.');
} catch (error) {
    console.error('Error creating table:', error);
}
