import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

const products = [
    {
        slug: 'company-profile-pro-kit',
        title: 'Company Profile Pro Kit',
        shortDescription: 'Template website company profile untuk bisnis jasa, agency, dan brand profesional.',
        description: 'Paket website company profile dengan struktur halaman yang jelas untuk menjelaskan layanan, portofolio, keunggulan, dan kontak bisnis.',
        coverImage: '/images/hero-design.png',
        screenshots: JSON.stringify(['/images/hero-design.png', '/images/hero-dashboard.png']),
        videoUrl: '',
        specifications: JSON.stringify([
            { label: 'Format', value: 'Next.js + Tailwind' },
            { label: 'Pages', value: 'Home, About, Services, Portfolio, Contact' },
            { label: 'Best for', value: 'Agency, consultant, service business' },
        ]),
        includes: JSON.stringify([
            'Responsive company profile layout',
            'Reusable service and portfolio sections',
            'Contact CTA structure',
            'Basic SEO metadata setup',
        ]),
        priceText: 'Rp 699.000',
        isPublished: 1,
        sortOrder: 3,
    },
    {
        slug: 'ecommerce-starter-template',
        title: 'Ecommerce Starter Template',
        shortDescription: 'Template toko online ringan untuk katalog produk, detail produk, dan CTA pembelian.',
        description: 'Starter template untuk membuat toko online sederhana dengan tampilan katalog yang rapi, halaman detail produk, dan alur pembelian yang mudah dipahami.',
        coverImage: '/images/hero-dashboard.png',
        screenshots: JSON.stringify(['/images/hero-dashboard.png', '/images/service-uiux.png']),
        videoUrl: '',
        specifications: JSON.stringify([
            { label: 'Format', value: 'Next.js components' },
            { label: 'Features', value: 'Catalog, product detail, CTA' },
            { label: 'Responsive', value: 'Mobile-first layout' },
        ]),
        includes: JSON.stringify([
            'Product grid layout',
            'Product detail page pattern',
            'WhatsApp purchase CTA',
            'Basic empty states',
        ]),
        priceText: 'Rp 899.000',
        isPublished: 1,
        sortOrder: 4,
    },
    {
        slug: 'admin-crm-dashboard-kit',
        title: 'Admin CRM Dashboard Kit',
        shortDescription: 'UI kit dashboard CRM untuk tracking leads, pelanggan, pipeline, dan aktivitas sales.',
        description: 'Kumpulan layout dashboard CRM yang membantu mempercepat pembuatan sistem sales, customer management, dan laporan aktivitas tim.',
        coverImage: '/images/hero-code.png',
        screenshots: JSON.stringify(['/images/hero-code.png', '/images/hero-dashboard.png', '/images/service-design.png']),
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        specifications: JSON.stringify([
            { label: 'Format', value: 'React UI components' },
            { label: 'Screens', value: 'Dashboard, leads, customer detail, reports' },
            { label: 'Theme', value: 'Light and dark ready' },
        ]),
        includes: JSON.stringify([
            'CRM overview dashboard',
            'Lead and customer table layouts',
            'Status badge and card components',
            'Report section patterns',
        ]),
        priceText: 'Rp 1.250.000',
        isPublished: 1,
        sortOrder: 5,
    },
    {
        slug: 'mobile-app-ui-starter',
        title: 'Mobile App UI Starter',
        shortDescription: 'Starter UI untuk aplikasi mobile seperti onboarding, auth, home, profile, dan settings.',
        description: 'Paket desain antarmuka mobile yang cocok untuk memulai aplikasi layanan, komunitas, marketplace ringan, atau produk internal.',
        coverImage: '/images/service-uiux.png',
        screenshots: JSON.stringify(['/images/service-uiux.png', '/images/service-design.png']),
        videoUrl: '',
        specifications: JSON.stringify([
            { label: 'Format', value: 'UI reference + component structure' },
            { label: 'Screens', value: 'Onboarding, auth, home, profile, settings' },
            { label: 'Platform', value: 'Android and iOS friendly' },
        ]),
        includes: JSON.stringify([
            'Mobile screen layout references',
            'Navigation and form patterns',
            'Reusable card and list sections',
            'Design notes for implementation',
        ]),
        priceText: 'Rp 599.000',
        isPublished: 1,
        sortOrder: 6,
    },
    {
        slug: 'automation-workflow-pack',
        title: 'Automation Workflow Pack',
        shortDescription: 'Paket blueprint otomasi untuk lead capture, notifikasi, approval, dan laporan sederhana.',
        description: 'Blueprint workflow untuk membantu bisnis mengurangi pekerjaan repetitif dengan alur otomatis yang mudah dipantau dan dikembangkan.',
        coverImage: '/images/service-design.png',
        screenshots: JSON.stringify(['/images/service-design.png', '/images/hero-code.png']),
        videoUrl: '',
        specifications: JSON.stringify([
            { label: 'Format', value: 'Workflow blueprint' },
            { label: 'Use cases', value: 'Lead, approval, notification, reporting' },
            { label: 'Delivery', value: 'Documentation and implementation guide' },
        ]),
        includes: JSON.stringify([
            'Workflow architecture notes',
            'Trigger and action checklist',
            'Simple approval flow example',
            'Implementation planning guide',
        ]),
        priceText: 'Rp 450.000',
        isPublished: 1,
        sortOrder: 7,
    },
];

const stmt = db.prepare(`
    INSERT OR REPLACE INTO shop_products (
        slug, title, shortDescription, description, coverImage, screenshots, videoUrl,
        specifications, includes, priceText, isPublished, sortOrder, createdAt, updatedAt
    )
    VALUES (
        @slug, @title, @shortDescription, @description, @coverImage, @screenshots, @videoUrl,
        @specifications, @includes, @priceText, @isPublished, @sortOrder,
        COALESCE((SELECT createdAt FROM shop_products WHERE slug = @slug), datetime('now')),
        datetime('now')
    )
`);

const insertProducts = db.transaction(() => {
    for (const product of products) {
        stmt.run(product);
    }
});

insertProducts();
console.log(`Seeded ${products.length} shop product examples.`);
