"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";
import { loadMoreProjectsAction } from "@/app/actions/public";

interface ProjectListProps {
    initialProjects: Project[];
    totalCount?: number; // Optional total count to know when to stop
}

export function ProjectList({ initialProjects, totalCount = 9999 }: ProjectListProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [loading, setLoading] = useState(false);

    // If we don't have a totalCount passed, we assume we have more if the last fetch returned the limit? 
    // Or we rely on the parent validation. Better to rely on explicit totalCount if possible.
    const hasMore = projects.length < totalCount;

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            // Load next 3
            const moreProjects = await loadMoreProjectsAction(projects.length, 3);
            if (moreProjects.length > 0) {
                setProjects(prev => [...prev, ...moreProjects]);
            }
        } catch (error) {
            console.error("Failed to load more projects", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                <AnimatePresence mode="popLayout">
                    {projects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <Link
                                href={`/projects/${project.slug}`}
                                className="block group h-full"
                            >
                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-colors hover:border-accent h-full flex flex-col">
                                    <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3] relative mb-4">
                                        {project.videoUrl ? (
                                            <video
                                                src={project.videoUrl}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="object-cover w-full h-full"
                                            />
                                        ) : project.imageUrl && (project.imageUrl.startsWith('/') || project.imageUrl.startsWith('http')) ? (
                                            <Image
                                                alt={project.title}
                                                src={project.imageUrl}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                                                <span className="material-symbols-outlined text-gray-400 text-4xl">
                                                    image
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                    </div>
                                    <div className="space-y-5 flex-1 flex flex-col">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-light dark:text-white font-display mb-2">{project.title}</h3>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="mt-auto space-y-5">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-xs uppercase text-text-muted-light dark:text-text-muted-dark font-semibold mb-1">Klien</p>
                                                    <p className="font-medium text-text-light dark:text-white">{project.client}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase text-text-muted-light dark:text-text-muted-dark font-semibold mb-1">Tahun</p>
                                                    <p className="font-medium text-text-light dark:text-white">{project.year}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase text-text-muted-light dark:text-text-muted-dark font-semibold mb-3">Layanan</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.services.split(',').map((tag, i) => (
                                                        <span key={i} className="bg-teal-50 dark:bg-gray-800 text-accent px-3 py-1 rounded-lg text-xs font-semibold border border-teal-100 dark:border-gray-700">{tag.trim()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {hasMore && (
                <div className="text-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="bg-primary hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-accent dark:text-gray-950 dark:hover:bg-teal-200"
                    >
                        {loading ? "Memuat..." : "Tampilkan lebih banyak"}
                    </button>
                </div>
            )}
        </div>
    );
}
