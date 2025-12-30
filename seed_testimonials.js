const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

const testimonials = [
    {
        name: "Andi Saputra",
        role: "CEO",
        company: "TechInovasi",
        content: "Bekerja dengan Risqi adalah pengalaman yang luar biasa. Website kami kini jauh lebih modern dan konversi penjualan meningkat drastis!",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
        name: "Siti Aminah",
        role: "Marketing Manager",
        company: "Kuliner Nusantara",
        content: "Desain UI/UX yang dibuat sangat intuitif. Pelanggan kami sangat menyukai tampilan baru aplikasi mobile kami.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
        name: "Budi Santoso",
        role: "Founder",
        company: "StartupKita",
        content: "Profesional, tepat waktu, dan hasil codingnya sangat rapi. Sangat direkomendasikan untuk pengembangan sistem web yang kompleks.",
        rating: 4,
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
        name: "Maya Wijaya",
        role: "Direktur Kreatif",
        company: "ArtSpace",
        content: "Risqi mampu menerjemahkan visi artistik kami menjadi website yang fungsional tanpa kehilangan estetika.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    }
];

const insertGroup = db.prepare(`
  INSERT INTO testimonials (name, role, company, content, rating, avatarUrl)
  VALUES (@name, @role, @company, @content, @rating, @avatarUrl)
`);

const insertMany = db.transaction((items) => {
    for (const item of items) insertGroup.run(item);
});

try {
    insertMany(testimonials);
    console.log('Dummy testimonials inserted successfully!');
} catch (error) {
    console.error('Error insert testimonials:', error.message);
}
