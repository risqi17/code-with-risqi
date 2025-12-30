import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative transition-colors duration-300">
                <AdminHeader />
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
                    {children}
                    {/* Footer */}
                    <footer className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-center text-xs text-gray-400">
                            &copy; 2025 Risqi Ahmad Portfolio. All rights reserved.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
