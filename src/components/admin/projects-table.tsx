import { Project } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { DeleteProjectButton } from "./delete-project-button";

export function ProjectsTable({ projects }: { projects: Project[] }) {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                            <th className="p-4 font-medium">Project Name</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Services</th>
                            <th className="p-4 font-medium">Year</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {projects.map((project) => (
                            <tr
                                key={project.id}
                                className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-14 rounded overflow-hidden relative bg-gray-700">
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                                            {project.title}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                    {project.category}
                                </td>
                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                    {project.services}
                                </td>
                                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                    {project.year}
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        Published
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                            className="text-gray-400 hover:text-primary transition-colors p-1"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                edit
                                            </span>
                                        </Link>
                                        <DeleteProjectButton id={project.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
