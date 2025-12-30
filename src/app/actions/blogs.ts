"use server";

import { createBlog, deleteBlog, updateBlog } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlogAction(formData: FormData) {
    const blog = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        coverImage: formData.get("coverImage") as string,
        author: formData.get("author") as string,
        publishedAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    createBlog(blog);
    revalidatePath("/admin/blogs");
    revalidatePath("/#blogs"); // Revalidate home page blogs section
    redirect("/admin/blogs");
}

export async function updateBlogAction(id: number, formData: FormData) {
    const blog = {
        id,
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        coverImage: formData.get("coverImage") as string,
        author: formData.get("author") as string,
        publishedAt: formData.get("publishedAt") as string,
    };

    updateBlog(blog);
    revalidatePath("/admin/blogs");
    revalidatePath("/#blogs");
    redirect("/admin/blogs");
}

export async function deleteBlogAction(id: number) {
    deleteBlog(id);
    revalidatePath("/admin/blogs");
    revalidatePath("/#blogs");
}
