const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

const galleryProject = {
    slug: 'modernist-interior',
    title: 'Modernist Interior',
    category: 'Interior Design',
    client: 'Luxe Spaces',
    year: '2024',
    description: 'A minimalist approach to modern living spaces, featuring clean lines and warm textures.',
    services: 'Interior Design, Photography, Styling',
    imageUrl: '/images/hero-design.png',
    videoUrl: '',
    gallery: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000, https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1000, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    content: '# Modernist Interior\n\nRedefining luxury through minimalism...'
};

try {
    const stmt = db.prepare(`
    INSERT INTO projects (slug, title, category, client, year, description, services, imageUrl, videoUrl, gallery, content)
    VALUES (@slug, @title, @category, @client, @year, @description, @services, @imageUrl, @videoUrl, @gallery, @content)
  `);
    stmt.run(galleryProject);
    console.log('Successfully added dummy gallery project: Modernist Interior');
} catch (error) {
    console.error('Error seeding project:', error.message);
}
