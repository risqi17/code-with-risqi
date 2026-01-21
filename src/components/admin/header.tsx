"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { AdminBreadcrumb } from "./admin-breadcrumb";

export function AdminHeader() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800/50 transition-colors duration-300">
            {/* Breadcrumbs */}
            <AdminBreadcrumb />
            {/* Search & Actions */}
            <div className="flex items-center gap-4">


                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="size-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        <span className="material-symbols-outlined">
                            {theme === "dark" ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                )}

                <button className="size-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                </button>
                <button className="sm:hidden size-10 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        </header>
    );
}
