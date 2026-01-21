import { getProjects, getBlogsCount, getTestimonialsCount, getProjectsCount } from "@/lib/db";
import { StatsGrid } from "@/components/admin/stats-grid";
import { RecentProjectsTable } from "@/components/admin/recent-projects-table";
import Link from "next/link";

export const revalidate = 0; // Ensure fresh data

export default function AdminDashboard() {
    const projects = getProjects();
    const totalProjects = getProjectsCount();
    const totalBlogs = getBlogsCount();
    const totalTestimonials = getTestimonialsCount();

    return (
        <div className="flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back. Here&apos;s the current status of your portfolio content.
                    </p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create Project
                </Link>
            </div>

            {/* Stats Grid */}
            <StatsGrid
                totalProjects={totalProjects}
                totalBlogs={totalBlogs}
                totalTestimonials={totalTestimonials}
            />

            <div className="flex flex-col gap-6">
                {/* Recent Projects Table */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Recent Projects
                        </h2>
                        <Link
                            className="text-sm font-medium text-primary hover:text-blue-400 transition-colors"
                            href="/admin/projects"
                        >
                            View All Projects
                        </Link>
                    </div>
                    <RecentProjectsTable projects={projects.slice(0, 5)} />
                </div>
            </div>
        </div>
    );
}
