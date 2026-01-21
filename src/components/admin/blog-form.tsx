"use client";

import { createBlogAction, updateBlogAction } from "@/app/actions/blogs";
import { Blog } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BlogFormProps {
    blog?: Blog;
    isEdit?: boolean;
}

import { Modal } from "@/components/ui/modal";

export function BlogForm({ blog, isEdit = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [alertState, setAlertState] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: "danger" | "success" | "warning";
    }>({
        isOpen: false,
        title: "",
        message: "",
        type: "warning"
    });

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            if (isEdit && blog) {
                // Preserve original publish date if not provided (though form usually doesn't update it)
                if (!formData.get("publishedAt")) {
                    formData.append("publishedAt", blog.publishedAt);
                }
                await updateBlogAction(blog.id, formData);
            } else {
                await createBlogAction(formData);
            }
            router.refresh();
            router.push("/admin/blogs");
        } catch (error) {
            console.error(error);
            setAlertState({
                isOpen: true,
                title: "Error",
                message: "An error occurred. Please try again.",
                type: "danger"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                isOpen={alertState.isOpen}
                onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                title={alertState.title}
                description={alertState.message}
                type={alertState.type}
                confirmText="Close"
                onConfirm={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                showCancel={false}
            />
            <form action={handleSubmit} className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Title
                        </label>
                        <input
                            name="title"
                            required
                            defaultValue={blog?.title}
                            placeholder="e.g. The Future of Web Design"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Slug
                        </label>
                        <input
                            name="slug"
                            required
                            defaultValue={blog?.slug}
                            placeholder="e.g. future-web-design"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Author
                        </label>
                        <input
                            name="author"
                            required
                            defaultValue={blog?.author || "Risqi Ahmad"}
                            placeholder="Author Name"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Cover Image URL
                        </label>
                        <input
                            name="coverImage"
                            required
                            defaultValue={blog?.coverImage}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Excerpt (Short Summary)
                        </label>
                        <textarea
                            name="excerpt"
                            required
                            rows={2}
                            defaultValue={blog?.excerpt}
                            placeholder="Brief summary for the blog card..."
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Content (Markdown/HTML)
                        </label>
                        <textarea
                            name="content"
                            required
                            rows={10}
                            defaultValue={blog?.content}
                            placeholder="Write your blog post here..."
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : (isEdit ? "Update Blog" : "Publish Blog")}
                    </button>
                </div>
            </form>

        </>
    );
}
