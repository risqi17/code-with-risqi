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
  content: string; // For detail page content (Legacy/Custom)
  details?: ProjectDetails;
  processSteps?: ProjectProcessStep[];
};

export type ProjectDetails = {
  project_id: number;
  overview_title: string;
  overview_desc_1: string;
  overview_desc_2: string;
  challenge_title: string;
  challenge_desc: string;
};

export type ProjectProcessStep = {
  id?: number;
  project_id: number;
  title: string;
  description: string;
  step_order: number;
};

export const getProjects = (): Project[] => {
  return db.prepare('SELECT * FROM projects ORDER BY id DESC').all() as Project[];
};

// Pagination and Counts
export function getPaginatedProjects(limit: number, offset: number): Project[] {
  const stmt = db.prepare("SELECT * FROM projects ORDER BY id DESC LIMIT ? OFFSET ?");
  const basicProjects = stmt.all(limit, offset) as Project[];
  return basicProjects.map(project => ({
    ...project,
    details: getProjectDetails(project.id),
    processSteps: getProjectProcessSteps(project.id)
  }));
}

export function getProjectsCount(): number {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM projects");
  const result = stmt.get() as { count: number };
  return result.count;
}

export function getBlogsCount(): number {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM blogs");
  const result = stmt.get() as { count: number };
  return result.count;
}

export function getTestimonialsCount(): number {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM testimonials");
  const result = stmt.get() as { count: number };
  return result.count;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const project = db.prepare('SELECT * FROM projects WHERE slug = ?').get(slug) as Project;
  if (project) {
    project.details = getProjectDetails(project.id);
    project.processSteps = getProjectProcessSteps(project.id);
  }
  return project;
}

export function getProjectById(id: number): Project | undefined {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project;
  if (project) {
    project.details = getProjectDetails(project.id);
    project.processSteps = getProjectProcessSteps(project.id);
  }
  return project;
}

export function getNextProject(currentId: number): Project {
  // Try to get the next project (older ID, since we display newest first)
  let next = db.prepare('SELECT * FROM projects WHERE id < ? ORDER BY id DESC LIMIT 1').get(currentId) as Project;

  // If no older project, wrap around to the newest one
  if (!next) {
    next = db.prepare('SELECT * FROM projects ORDER BY id DESC LIMIT 1').get() as Project;
  }

  // Don't fetch details for the nav card, just basic info is enough, but type expects it.
  // Ideally we'd have a lighter type, but for now this is fine.
  return next;
}

export const createProject = (project: Omit<Project, 'id'>) => {
  const stmt = db.prepare(`
    INSERT INTO projects (slug, title, category, client, year, description, services, imageUrl, videoUrl, gallery, content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    project.slug,
    project.title,
    project.category,
    project.client,
    project.year,
    project.description,
    project.services,
    project.imageUrl,
    project.videoUrl,
    project.gallery,
    project.content
  );
  return info.lastInsertRowid;
};

export function updateProject(project: Partial<Project> & { id: number }) {
  const fields: string[] = [];
  const values: Array<string | number | undefined> = [];
  const editableFields: Array<keyof Omit<Project, 'id' | 'details' | 'processSteps'>> = [
    'slug',
    'title',
    'category',
    'client',
    'year',
    'description',
    'services',
    'imageUrl',
    'videoUrl',
    'gallery',
    'content',
  ];

  editableFields.forEach((key) => {
    if (project[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(project[key]);
    }
  });

  values.push(project.id);

  const stmt = db.prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
}

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

export type ShopSpecification = {
  label: string;
  value: string;
};

export type ShopProduct = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  videoUrl?: string;
  specifications: ShopSpecification[];
  includes: string[];
  priceText: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type ShopProductRow = Omit<ShopProduct, 'screenshots' | 'specifications' | 'includes' | 'isPublished'> & {
  screenshots: string;
  specifications: string;
  includes: string;
  isPublished: number;
};

export type ShopProductInput = Omit<ShopProduct, 'id' | 'screenshots' | 'specifications' | 'includes' | 'isPublished' | 'createdAt' | 'updatedAt'> & {
  screenshots: string;
  specifications: string;
  includes: string;
  isPublished: number;
};

function parseJsonArray<T>(value: string | null | undefined): T[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch {
    return [];
  }
}

function parseShopProduct(row: ShopProductRow): ShopProduct {
  return {
    ...row,
    screenshots: parseJsonArray<string>(row.screenshots).filter(Boolean),
    specifications: parseJsonArray<ShopSpecification>(row.specifications).filter(spec => spec.label && spec.value),
    includes: parseJsonArray<string>(row.includes).filter(Boolean),
    isPublished: Boolean(row.isPublished),
  };
}

export function getShopProducts(): ShopProduct[] {
  const rows = db.prepare('SELECT * FROM shop_products ORDER BY sortOrder ASC, createdAt DESC').all() as ShopProductRow[];
  return rows.map(parseShopProduct);
}

export function getPublishedShopProducts(): ShopProduct[] {
  const rows = db.prepare('SELECT * FROM shop_products WHERE isPublished = 1 ORDER BY sortOrder ASC, createdAt DESC').all() as ShopProductRow[];
  return rows.map(parseShopProduct);
}

export function getShopProductBySlug(slug: string, includeUnpublished = false): ShopProduct | undefined {
  const query = includeUnpublished
    ? 'SELECT * FROM shop_products WHERE slug = ?'
    : 'SELECT * FROM shop_products WHERE slug = ? AND isPublished = 1';
  const row = db.prepare(query).get(slug) as ShopProductRow | undefined;
  return row ? parseShopProduct(row) : undefined;
}

export function getShopProductById(id: number): ShopProduct | undefined {
  const row = db.prepare('SELECT * FROM shop_products WHERE id = ?').get(id) as ShopProductRow | undefined;
  return row ? parseShopProduct(row) : undefined;
}

export function createShopProduct(product: ShopProductInput) {
  const stmt = db.prepare(`
    INSERT INTO shop_products (
      slug, title, shortDescription, description, coverImage, screenshots, videoUrl,
      specifications, includes, priceText, isPublished, sortOrder, createdAt, updatedAt
    )
    VALUES (
      @slug, @title, @shortDescription, @description, @coverImage, @screenshots, @videoUrl,
      @specifications, @includes, @priceText, @isPublished, @sortOrder, datetime('now'), datetime('now')
    )
  `);
  return stmt.run(product);
}

export function updateShopProduct(id: number, product: ShopProductInput) {
  const stmt = db.prepare(`
    UPDATE shop_products
    SET slug = @slug,
        title = @title,
        shortDescription = @shortDescription,
        description = @description,
        coverImage = @coverImage,
        screenshots = @screenshots,
        videoUrl = @videoUrl,
        specifications = @specifications,
        includes = @includes,
        priceText = @priceText,
        isPublished = @isPublished,
        sortOrder = @sortOrder,
        updatedAt = datetime('now')
    WHERE id = @id
  `);
  return stmt.run({ ...product, id });
}

export function deleteShopProduct(id: number) {
  return db.prepare('DELETE FROM shop_products WHERE id = ?').run(id);
}


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


// Project Details & Steps Functions

export function getProjectDetails(projectId: number): ProjectDetails | undefined {
  return db.prepare('SELECT * FROM project_details WHERE project_id = ?').get(projectId) as ProjectDetails;
}

export function getProjectProcessSteps(projectId: number): ProjectProcessStep[] {
  return db.prepare('SELECT * FROM project_process_steps WHERE project_id = ? ORDER BY step_order ASC').all(projectId) as ProjectProcessStep[];
}

export function saveProjectDetails(details: ProjectDetails) {
  const existing = getProjectDetails(details.project_id);
  if (existing) {
    const stmt = db.prepare(`
            UPDATE project_details 
            SET overview_title = ?, overview_desc_1 = ?, overview_desc_2 = ?, challenge_title = ?, challenge_desc = ?
            WHERE project_id = ?
        `);
    stmt.run(details.overview_title, details.overview_desc_1, details.overview_desc_2, details.challenge_title, details.challenge_desc, details.project_id);
  } else {
    const stmt = db.prepare(`
            INSERT INTO project_details (project_id, overview_title, overview_desc_1, overview_desc_2, challenge_title, challenge_desc)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
    stmt.run(details.project_id, details.overview_title, details.overview_desc_1, details.overview_desc_2, details.challenge_title, details.challenge_desc);
  }
}

export function saveProjectProcessSteps(projectId: number, steps: ProjectProcessStep[]) {
  // Transaction to replace steps
  const deleteStmt = db.prepare('DELETE FROM project_process_steps WHERE project_id = ?');
  const insertStmt = db.prepare(`
        INSERT INTO project_process_steps (project_id, title, description, step_order)
        VALUES (?, ?, ?, ?)
    `);

  const transaction = db.transaction(() => {
    deleteStmt.run(projectId);
    steps.forEach((step, index) => {
      insertStmt.run(projectId, step.title, step.description, index + 1);
    });
  });
  transaction();
}

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
};

export const getUserByEmail = (email: string): User | undefined => {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
};

export default db;
