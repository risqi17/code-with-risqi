"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";

interface BlogListProps {
    blogs: Blog[];
}

export function BlogList({ blogs }: BlogListProps) {
    const [visibleCount, setVisibleCount] = useState(3);

    const displayedBlogs = blogs.slice(0, visibleCount);
    const hasMore = visibleCount < blogs.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <div className="space-y-5 site-container-narrow">
            <AnimatePresence mode="popLayout">
                {displayedBlogs.map((blog) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-5 transition-colors hover:border-accent group"
                    >
                        <div className="w-full md:w-52 h-40 md:h-auto rounded-lg overflow-hidden shrink-0 relative bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 300px"
                            />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                            <span className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark mb-2">
                                {new Date(blog.publishedAt).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                            <h3 className="text-lg font-bold text-text-light dark:text-white mb-2 group-hover:text-accent transition-colors font-display line-clamp-2">
                                <Link href={`/blogs/${blog.slug}`}>
                                    {blog.title}
                                </Link>
                            </h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3 line-clamp-2 leading-relaxed">
                                {blog.excerpt}
                            </p>
                            <Link
                                href={`/blogs/${blog.slug}`} // Assuming individual blog page exists or will exist. If not this link might 404, but it's standard practice.
                                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-text-light dark:text-white hover:text-accent transition-colors mt-auto"
                            >
                                Baca selengkapnya <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {hasMore && (
                <div className="text-center pt-8">
                    <button
                        onClick={handleLoadMore}
                        className="bg-primary hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors dark:bg-accent dark:text-gray-950 dark:hover:bg-teal-200"
                    >
                        Tampilkan lebih banyak
                    </button>
                </div>
            )}
        </div>
    );
}
