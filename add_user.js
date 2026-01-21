const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('node:crypto');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

const [, , email, password, name] = process.argv;

if (!email || !password || !name) {
    console.error('Usage: node add_user.js <email> <password> <name>');
    process.exit(1);
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

try {
    const hashedPassword = hashPassword(password);

    const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
    stmt.run(email, hashedPassword, name);

    console.log(`User ${email} created successfully.`);
} catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        console.error('Error: Email already exists.');
    } else {
        console.error('Error creating user:', error);
    }
}
