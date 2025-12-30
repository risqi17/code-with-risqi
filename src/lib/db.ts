import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'risqi.db');
const db = new Database(dbPath);

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  services: string; // JSON string or comma separated
  imageUrl: string;
  videoUrl?: string; // Optional video URL
  gallery?: string; // Comma separated image URLs
  content: string; // For detail page content
};

export const getProjects = (): Project[] => {
  return db.prepare('SELECT * FROM projects ORDER BY id DESC').all() as Project[];
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return db.prepare('SELECT * FROM projects WHERE slug = ?').get(slug) as Project | undefined;
};

export const getProjectById = (id: number): Project | undefined => {
  return db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined;
};

export const createProject = (project: Omit<Project, 'id'>) => {
  const stmt = db.prepare(`
    INSERT INTO projects (slug, title, category, client, year, description, services, imageUrl, videoUrl, gallery, content)
    VALUES (@slug, @title, @category, @client, @year, @description, @services, @imageUrl, @videoUrl, @gallery, @content)
  `);
  return stmt.run(project);
};

export const updateProject = (project: Project) => {
  const stmt = db.prepare(`
    UPDATE projects
    SET slug = @slug, title = @title, category = @category, client = @client, year = @year,
        description = @description, services = @services, imageUrl = @imageUrl, videoUrl = @videoUrl, gallery = @gallery, content = @content
    WHERE id = @id
  `);
  return stmt.run(project);
};

export const deleteProject = (id: number) => {
  return db.prepare('DELETE FROM projects WHERE id = ?').run(id);
};


export type Blog = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: string;
};

export const getBlogs = (): Blog[] => {
  return db.prepare('SELECT * FROM blogs ORDER BY publishedAt DESC').all() as Blog[];
};

export const getBlogBySlug = (slug: string): Blog | undefined => {
  return db.prepare('SELECT * FROM blogs WHERE slug = ?').get(slug) as Blog | undefined;
};

export const getBlogById = (id: number): Blog | undefined => {
  return db.prepare('SELECT * FROM blogs WHERE id = ?').get(id) as Blog | undefined;
};

export const createBlog = (blog: Omit<Blog, 'id'>) => {
  const stmt = db.prepare(`
    INSERT INTO blogs (slug, title, excerpt, content, coverImage, publishedAt, author)
    VALUES (@slug, @title, @excerpt, @content, @coverImage, @publishedAt, @author)
  `);
  return stmt.run(blog);
};

export const updateBlog = (blog: Blog) => {
  const stmt = db.prepare(`
    UPDATE blogs
    SET slug = @slug, title = @title, excerpt = @excerpt, content = @content,
        coverImage = @coverImage, publishedAt = @publishedAt, author = @author
    WHERE id = @id
  `);
  return stmt.run(blog);
};

export const deleteBlog = (id: number) => {
  return db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
};


export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  createdAt: string;
};

export const getTestimonials = (): Testimonial[] => {
  return db.prepare('SELECT * FROM testimonials ORDER BY createdAt DESC').all() as Testimonial[];
};

export const getTestimonialById = (id: number): Testimonial | undefined => {
  return db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id) as Testimonial | undefined;
};

export const createTestimonial = (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
  const stmt = db.prepare(`
    INSERT INTO testimonials (name, role, company, content, rating, avatarUrl)
    VALUES (@name, @role, @company, @content, @rating, @avatarUrl)
  `);
  return stmt.run(testimonial);
};

export const updateTestimonial = (testimonial: Testimonial) => {
  const stmt = db.prepare(`
    UPDATE testimonials
    SET name = @name, role = @role, company = @company, content = @content,
        rating = @rating, avatarUrl = @avatarUrl
    WHERE id = @id
  `);
  return stmt.run(testimonial);
};

export const deleteTestimonial = (id: number) => {
  return db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
};

export default db;
