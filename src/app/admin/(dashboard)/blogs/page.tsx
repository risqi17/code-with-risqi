import { BlogsTable } from "@/components/admin/blogs-table";
import { getBlogs } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0;

export default function AdminBlogsPage() {
    const blogs = getBlogs();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">
                        Blog Posts
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your blog content and publications.
                    </p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-gray-900 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined mr-2 text-xl">add</span>
                    New Post
                </Link>
            </div>

            <BlogsTable blogs={blogs} />
        </div>
    );
}
