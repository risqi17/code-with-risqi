import { getProjects } from "@/lib/db";
import { ProjectsTable } from "@/components/admin/projects-table";
import Link from "next/link";

export const revalidate = 0;

export default function ProjectsPage() {
    const projects = getProjects();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Projects
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your portfolio projects.
                    </p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Add Project
                </Link>
            </div>

            <ProjectsTable projects={projects} />
        </div>
    );
}
