"use client";

import { createProjectAction, updateProjectAction } from "@/app/actions/projects";
import { Project } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectFormProps {
    project?: Project;
    isEdit?: boolean;
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            if (isEdit && project) {
                await updateProjectAction(project.id, formData);
            } else {
                await createProjectAction(formData);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Project Title
                    </label>
                    <input
                        name="title"
                        required
                        defaultValue={project?.title}
                        placeholder="e.g. Fintech Branding"
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
                        defaultValue={project?.slug}
                        placeholder="e.g. fintech-branding"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Category
                    </label>
                    <input
                        name="category"
                        required
                        defaultValue={project?.category}
                        placeholder="e.g. Identity, Web Design"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Client
                    </label>
                    <input
                        name="client"
                        required
                        defaultValue={project?.client}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Year
                    </label>
                    <input
                        name="year"
                        required
                        defaultValue={project?.year}
                        placeholder="e.g. 2023"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Services (Comma separated)
                    </label>
                    <input
                        name="services"
                        required
                        defaultValue={project?.services}
                        placeholder="e.g. Branding, UI/UX"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Image URL
                </label>
                <input
                    name="imageUrl"
                    required
                    defaultValue={project?.imageUrl}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Video URL (Optional)
                </label>
                <input
                    name="videoUrl"
                    defaultValue={project?.videoUrl}
                    placeholder="https://... (mp4/webm)"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">If provided, this video will autoplay in thumbnails.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Gallery Image URLs (Optional)
                </label>
                <textarea
                    name="gallery"
                    rows={3}
                    defaultValue={project?.gallery}
                    placeholder="https://image1.jpg, https://image2.jpg (Comma separated)"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Add multiple image URLs separated by commas for the project gallery.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Short Description
                </label>
                <textarea
                    name="description"
                    required
                    rows={2}
                    defaultValue={project?.description}
                    placeholder="Brief overview of the project"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Detail Content (Markdown/HTML)
                </label>
                <textarea
                    name="content"
                    required
                    rows={6}
                    defaultValue={project?.content}
                    placeholder="Detailed case study content..."
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                />
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
                    {loading ? "Saving..." : (isEdit ? "Update Project" : "Create Project")}
                </button>
            </div>
        </form>
    );
}
