const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

const videoProject = {
    slug: 'neon-cyberpunk-reel',
    title: 'Neon Cyberpunk Reel',
    category: 'Motion Graphics',
    client: 'Future Tech',
    year: '2024',
    description: 'A high-energy motion graphics showreel featuring neon aesthetics and glitch effects.',
    services: 'Motion Design, 3D Animation, VFX',
    imageUrl: '/images/hero-design.png', // Fallback image
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    content: '# Neon Cyberpunk Reel\n\nThis project pushed the boundaries of real-time rendering...'
};

try {
    const stmt = db.prepare(`
    INSERT INTO projects (slug, title, category, client, year, description, services, imageUrl, videoUrl, content)
    VALUES (@slug, @title, @category, @client, @year, @description, @services, @imageUrl, @videoUrl, @content)
  `);
    stmt.run(videoProject);
    console.log('Successfully added dummy video project: Neon Cyberpunk Reel');
} catch (error) {
    console.error('Error seeding project:', error.message);
}
