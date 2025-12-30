import { getProjects } from "@/lib/db";
import { StatsGrid } from "@/components/admin/stats-grid";
import { RecentProjectsTable } from "@/components/admin/recent-projects-table";
import { RecentInquiries } from "@/components/admin/recent-inquiries";

export const revalidate = 0; // Ensure fresh data

export default function AdminDashboard() {
    const projects = getProjects();
    const totalProjects = projects.length;

    return (
        <div className="flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Welcome back, Risqi. Here&apos;s what&apos;s happening with your
                        portfolio today.
                    </p>
                </div>
                <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Create New
                </button>
            </div>

            {/* Stats Grid */}
            <StatsGrid totalProjects={totalProjects} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Recent Projects Table */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Recent Projects
                        </h2>
                        <a
                            className="text-sm font-medium text-primary hover:text-blue-400 transition-colors"
                            href="/admin/projects"
                        >
                            View All
                        </a>
                    </div>
                    <RecentProjectsTable projects={projects.slice(0, 5)} />
                </div>

                {/* Right Column: Recent Inquiries */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Recent Inquiries
                        </h2>
                        <a
                            className="text-sm font-medium text-primary hover:text-blue-400 transition-colors"
                            href="#"
                        >
                            View All
                        </a>
                    </div>
                    <RecentInquiries />
                </div>
            </div>
        </div>
    );
}
