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
        <div className="space-y-6 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
                {displayedBlogs.map((blog) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 transition-all hover:shadow-lg hover:-translate-y-1 group"
                    >
                        <div className="w-full md:w-64 h-48 md:h-auto rounded-xl overflow-hidden shrink-0 relative bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                            <h3 className="text-xl font-bold text-text-light dark:text-white mb-3 group-hover:text-accent transition-colors font-display line-clamp-2">
                                <Link href={`/blogs/${blog.slug}`}>
                                    {blog.title}
                                </Link>
                            </h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4 line-clamp-2 leading-relaxed">
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
                        className="bg-primary hover:bg-black text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                        Tampilkan lebih banyak
                    </button>
                </div>
            )}
        </div>
    );
}
