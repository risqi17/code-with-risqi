import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

try {
    console.log('Creating shop_products table...');
    db.exec(`
        CREATE TABLE IF NOT EXISTS shop_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            shortDescription TEXT NOT NULL,
            description TEXT NOT NULL,
            coverImage TEXT NOT NULL,
            screenshots TEXT NOT NULL DEFAULT '[]',
            videoUrl TEXT,
            specifications TEXT NOT NULL DEFAULT '[]',
            includes TEXT NOT NULL DEFAULT '[]',
            priceText TEXT NOT NULL,
            isPublished INTEGER NOT NULL DEFAULT 1,
            sortOrder INTEGER NOT NULL DEFAULT 0,
            createdAt TEXT NOT NULL DEFAULT (datetime('now')),
            updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);
    console.log('Successfully created shop_products table.');
} catch (error) {
    console.error('Error creating shop_products table:', error);
    process.exitCode = 1;
}
