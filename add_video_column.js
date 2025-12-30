const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

try {
    console.log('Adding videoUrl column to projects table...');
    db.prepare('ALTER TABLE projects ADD COLUMN videoUrl TEXT').run();
    console.log('Successfully added videoUrl column.');
} catch (error) {
    if (error.message.includes('duplicate column name')) {
        console.log('Column videoUrl already exists.');
    } else {
        console.error('Error altering table:', error);
    }
}
