const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

try {
    console.log('Adding gallery column to projects table...');
    db.prepare('ALTER TABLE projects ADD COLUMN gallery TEXT').run();
    console.log('Successfully added gallery column.');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('Column gallery already exists.');
    } else {
        console.error('Error altering table:', error);
    }
}
