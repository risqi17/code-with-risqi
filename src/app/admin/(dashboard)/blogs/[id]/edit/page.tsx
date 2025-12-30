import { BlogForm } from "@/components/admin/blog-form";
import { getBlogById } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: PageProps) {
    const { id } = await params;
    const blog = getBlogById(parseInt(id));

    if (!blog) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">
                    Edit Blog Post
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Update content for: <span className="font-semibold text-gray-900 dark:text-white">{blog.title}</span>
                </p>
            </div>

            <BlogForm blog={blog} isEdit />
        </div>
    );
}
