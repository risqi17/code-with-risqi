import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://codewithrisqi.com"; // Replace with actual domain

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/admin/", // Disallow admin routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
