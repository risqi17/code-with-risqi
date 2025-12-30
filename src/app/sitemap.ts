import { getProjects, getBlogs } from "@/lib/db";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const projects = getProjects();
    const blogs = getBlogs();
    const baseUrl = "https://codewithrisqi.com"; // Replace with actual domain

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...projectUrls,
        ...blogUrls,
    ];
}
