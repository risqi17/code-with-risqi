const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    category TEXT,
    client TEXT,
    year TEXT,
    description TEXT,
    services TEXT,
    imageUrl TEXT,
    content TEXT
  )
`);

const projects = [
  {
    slug: 'union-dashboard',
    title: 'Union - Dasbor Manajemen Faktur',
    category: 'Desain Dasbor',
    client: 'Jay Idzes',
    year: '2024',
    description: 'Union menawarkan gambaran jelas tentang faktur yang tertunda, terbayar, dan jatuh tempo, dengan fitur seperti pengingat otomatis, template faktur yang dapat disesuaikan, dan pelaporan keuangan terperinci.',
    services: 'DESAIN UI/UX, LOGO & BRANDING',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVMe4MVJOni0Z2stQRdoDBsdVU7_9-4w-FWu_xfCnIh-wPEWJD9448xaoyipRfJJ180anQtrDOUQM-fjPdxbWyjsnBFgdwxV7Acrt2yDrZlP7y-_Ei2lUSz5huxvoobhVcGXFKaWHRLypaNoq7nXQcXkHPnTV9sIoDypD0yf9ZDKJXY8LncsR2fmYctAtQ0U9rJbKr0-nDrG-I6HvP4vFs5k5rOPLA3rablm0oLSE8eqjESJouEkZc_ivIYU-P257gQzEBJKW6FLtv',
    content: '<p>Detail proyek lengkap untuk Union...</p>'
  },
  {
    slug: 'wally-wealth',
    title: 'Wally - Aplikasi Manajemen Kekayaan',
    category: 'Aplikasi Seluler',
    client: 'Justin Hubner',
    year: '2024',
    description: 'Wally membantu pengguna melacak pengeluaran, menetapkan tujuan keuangan, dan mengelola investasi dengan mudah. Menampilkan alat penganggaran, analisis portofolio, dan wawasan waktu nyata.',
    services: 'DESAIN UI/UX, LOGO & BRANDING',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeXNb0arBf9xfn4aj1G4qIztBuNMwb6K0qBnItJSTdxYtTqG6aF54stp8UmwlGvMkIfETOKR9EscRuHNAZXnxFZe1GBcPyGZtzPkFswKFEKx5qvWJAFV-QKeN3INkFIH6iBSWI03zCTEwOi9SnbZs7WFEEuwCxuGorVxlDTg3-JeH0rpEubjBFlF-0-5vk4vCZ88fGziBPX-RW6tZqyLwH2i3BifU4UOsrEsfHx9PZLbmJDJkCW4iHYu0j3kiJbiPQ4beBNqpN3OSc',
    content: '<p>Detail proyek lengkap untuk Wally...</p>'
  },
  {
    slug: 'disaina-instagram',
    title: 'Disaina - Desain Postingan Instagram',
    category: 'Postingan Instagram',
    client: 'Mees Hilgers',
    year: '2024',
    description: 'Dengan berbagai template, font, dan elemen desain yang dapat disesuaikan, ini menyederhanakan proses produksi visual berkualitas profesional.',
    services: 'LOGO & BRANDING, MATERI PEMASARAN',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7bmyW1wmY62Vl7gvlIHDrXa_u70ARZ4Zni6y-UggxSpGHMgrX1CSMQQZ0lQKwUGPXFY-WHGUemPC9sOO-R0F9Dh6Vq6npglcCrbMt8k38x5C5b2jyKqdVo3ltPWtrIUxVc4iDOxOgMKmVXjFcGiyBTnBC9X_8IhIRn40YdvGZy9ROmCdG_m0EnUOh_OLpncHTOqUGbZ3DI3kJvB6_hRVcPpqAcIRt7Nc9oZACdpRVyvjw_p8cBj2ISWVVSozAjBUs8WPbAgg-4I5A',
    content: '<p>Detail proyek lengkap untuk Disaina...</p>'
  }
];

const insert = db.prepare(`
  INSERT OR REPLACE INTO projects (slug, title, category, client, year, description, services, imageUrl, content)
  VALUES (@slug, @title, @category, @client, @year, @description, @services, @imageUrl, @content)
`);

const insertMany = db.transaction((projects) => {
  for (const project of projects) insert.run(project);
});

insertMany(projects);
console.log('Database seeded successfully!');
