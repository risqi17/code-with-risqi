const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

console.log('Creating project_details table...');
db.exec(`
  CREATE TABLE IF NOT EXISTS project_details (
    project_id INTEGER PRIMARY KEY,
    overview_title TEXT DEFAULT 'Gambaran Proyek',
    overview_desc_1 TEXT,
    overview_desc_2 TEXT,
    challenge_title TEXT DEFAULT 'Tantangan',
    challenge_desc TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  )
`);

console.log('Creating project_process_steps table...');
db.exec(`
  CREATE TABLE IF NOT EXISTS project_process_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    title TEXT,
    description TEXT,
    step_order INTEGER,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  )
`);

console.log('Tables created successfully.');
