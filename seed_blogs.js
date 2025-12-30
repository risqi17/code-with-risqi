const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

const blogs = [
    {
        slug: 'future-of-react-server-components',
        title: 'The Future of React: Server Components Explained',
        excerpt: 'Deep dive into how React Server Components are changing the way we build full-stack applications with better performance and smaller bundles.',
        content: `
# The Future of React: Server Components Explained

React Server Components (RSC) represent a major shift in how we build React applications. By allowing components to render exclusively on the server, we can reduce the amount of JavaScript sent to the client, improving performance and user experience.

## What are Server Components?

Server Components allow developers to build applications that span the server and client. This combines the rich interactivity of client-side apps with the improved performance of traditional server rendering.

## Key Benefits

1. **Zero Bundle Size**: Server Components code doesn't get downloaded to the client.
2. **Access to Backend Resources**: You can access your database, file system, or microservices directly from your components.
3. **Automatic Code Splitting**: Server Components allow you to split your code automatically.

## Conclusion

RSC is a game changer for React development, offering a best-of-both-worlds solution for performance and interactivity.
    `,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
        publishedAt: '2024-03-15',
        author: 'Risqi Ahmad'
    },
    {
        slug: 'mastering-css-grid-2024',
        title: 'Mastering CSS Grid Layout in 2024',
        excerpt: 'A comprehensive guide to building complex two-dimensional layouts using CSS Grid, from basics to advanced techniques.',
        content: `
# Mastering CSS Grid Layout in 2024

CSS Grid Layout excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.

## Why CSS Grid?

Unlike Flexbox, which is one-dimensional, Grid is two-dimensional. This means it can handle both columns and rows simultaneously.

## Common Patterns

### The 12-Column Grid
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
\`\`\`

### Holy Grail Layout
Grid makes implementing the classic "header, sidebar, main content, footer" layout trivial.

## Conclusion
CSS Grid is an essential tool for modern web design, enabling layouts that were previously impossible or required complex hacks.
    `,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1000',
        publishedAt: '2024-03-10',
        author: 'Risqi Ahmad'
    },
    {
        slug: 'web-accessibility-guide',
        title: 'Why Accessibility Matters in Modern Web Development',
        excerpt: 'Understanding the importance of A11y and how to implement it to ensure your web applications are usable by everyone.',
        content: `
# Why Accessibility Matters in Modern Web Development

Web accessibility (often abbreviated as a11y) is the practice of designing and developing websites that everyone can use, including people with disabilities.

## It's Not Just About Compliance

While legal requirements are a factor, accessibility is primarily about empathy and inclusion.

## Practical Tips

1. **Use Semantic HTML**: Use \`<button>\` for buttons, not \`<div>\`.
2. **Color Contrast**: Ensure text has sufficient contrast against its background.
3. **Keyboard Navigation**: Ensure all interactive elements can be reached and used with a keyboard.

## ARIA Labels
Use ARIA labels sparingly and only when necessary to enhance the semantic meaning of elements for screen readers.

## Conclusion
Building accessible webs makes the internet better for everyone.
    `,
        coverImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000',
        publishedAt: '2024-03-05',
        author: 'Risqi Ahmad'
    },
    {
        slug: 'optimizing-nextjs-performance',
        title: 'Optimizing Next.js Applications for Core Web Vitals',
        excerpt: 'Practical strategies to improve your Core Web Vitals scores in Next.js applications, focusing on LCP, FID, and CLS.',
        content: `
# Optimizing Next.js Applications for Core Web Vitals

Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience.

## LCP (Largest Contentful Paint)
To improve LCP, ensure your main image or text block loads quickly. Use \`next/image\` with the \`priority\` prop for above-the-fold images.

## CLS (Cumulative Layout Shift)
Avoid layout shifts by always specifying dimensions for images and using font-display: optional or swap strategies properly.

## Dynamic Imports
Use \`next/dynamic\` to lazy load heavy components that aren't critical for the initial render.

## Conclusion
Next.js provides powerful built-in tools for performance, but it's up to developers to use them correctly.
    `,
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
        publishedAt: '2024-02-28',
        author: 'Risqi Ahmad'
    },
    {
        slug: 'tailwind-css-guide',
        title: 'A Guide into the world of Tailwind CSS',
        excerpt: 'Exploring the utility-first CSS framework that has revolutionized how we style web applications.',
        content: `
# A Guide into the world of Tailwind CSS

Tailwind CSS is a utility-first CSS framework packed with classes like \`flex\`, \`pt-4\`, \`text-center\` and \`rotate-90\` that can be composed to build any design, directly in your markup.

## The Utility-First Workflow
Instead of writing custom CSS, you apply pre-existing classes to your HTML elements. This leads to:
- **Faster Development**: No switching context between HTML and CSS files.
- **Consistent Design**: Values are picked from a designated design system (your config).
- **Smaller Bundle Sizes**: Unused CSS is purged automatically.

## Customization
Tailwind is highly customizable via the \`tailwind.config.js\` file, allowing you to define your own colors, spacing, and variants.

## Conclusion
Tailwind CSS might look ugly at first, but once you start using it, the productivity boost is undeniable.
    `,
        coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000',
        publishedAt: '2024-02-20',
        author: 'Risqi Ahmad'
    }
];

const insertStmt = db.prepare(`
  INSERT INTO blogs (slug, title, excerpt, content, coverImage, publishedAt, author)
  VALUES (@slug, @title, @excerpt, @content, @coverImage, @publishedAt, @author)
`);

const checkStmt = db.prepare('SELECT id FROM blogs WHERE slug = ?');

try {
    db.transaction(() => {
        for (const blog of blogs) {
            const existing = checkStmt.get(blog.slug);
            if (!existing) {
                insertStmt.run(blog);
                console.log(`Added blog: ${blog.title}`);
            } else {
                console.log(`Skipped existing blog: ${blog.title}`);
            }
        }
    })();
    console.log('Successfully seeded blogs!');
} catch (error) {
    console.error('Error seeding blogs:', error.message);
}
