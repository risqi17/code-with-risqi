import { Blog } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { DeleteBlogButton } from "./delete-blog-button";

export function BlogsTable({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                            Excerpt
                        </th>
                        <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Published
                        </th>
                        <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {blogs.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                No blog posts found.
                            </td>
                        </tr>
                    ) : (
                        blogs.map((blog) => (
                            <tr
                                key={blog.id}
                                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            {blog.coverImage ? (
                                                <Image
                                                    src={blog.coverImage}
                                                    alt={blog.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <span className="material-symbols-outlined text-lg">image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {blog.title}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                                /{blog.slug}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 hidden md:table-cell">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-w-xs">
                                        {blog.excerpt}
                                    </p>
                                </td>
                                <td className="py-4 px-6 hidden sm:table-cell">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        {blog.publishedAt}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end space-x-3">
                                        <Link
                                            href={`/admin/blogs/${blog.id}/edit`}
                                            className="text-gray-500 hover:text-primary transition-colors"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        <DeleteBlogButton id={blog.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
