import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">
                    Create New Blog Post
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Share your thoughts and insights with the world.
                </p>
            </div>

            <BlogForm />
        </div>
    );
}
