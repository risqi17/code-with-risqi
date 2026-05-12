"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => pathname === path;
    const isActiveSection = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    return (
        <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-[#0c0f16] border-r border-gray-200 dark:border-gray-800 h-full flex-shrink-0 transition-colors duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
                    AD
                </div>
                <div>
                    <h1 className="text-base font-bold leading-tight dark:text-white text-gray-900">
                        Risqi Ahmad
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Admin Console
                    </p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
                <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Main Menu
                </p>
                <Link
                    href="/admin"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive("/admin")
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link
                    href="/admin/projects"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${isActiveSection("/admin/projects")
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <span className={`material-symbols-outlined mr-3 text-[22px] transition-transform group-hover:scale-110 ${isActiveSection("/admin/projects") ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}>
                        folder_open
                    </span>
                    Projects
                </Link>

                <Link
                    href="/admin/shop"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${isActiveSection("/admin/shop")
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <span className={`material-symbols-outlined mr-3 text-[22px] transition-transform group-hover:scale-110 ${isActiveSection("/admin/shop") ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}>
                        storefront
                    </span>
                    Shop
                </Link>

                <Link
                    href="/admin/blogs"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${isActiveSection("/admin/blogs")
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <span className={`material-symbols-outlined mr-3 text-[22px] transition-transform group-hover:scale-110 ${isActiveSection("/admin/blogs") ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}>
                        article
                    </span>
                    Blogs
                </Link>
                {/* <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all group"
                >
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
                        article
                    </span>
                    <span className="text-sm font-medium">Blog Posts</span>
                </Link> */}
                <Link
                    href="/admin/testimonials"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${isActiveSection("/admin/testimonials")
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                >
                    <span className={`material-symbols-outlined mr-3 text-[22px] transition-transform group-hover:scale-110 ${isActiveSection("/admin/testimonials") ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}>
                        reviews
                    </span>
                    Testimonials
                </Link>
                {/* <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all group justify-between"
                >
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
                            mail
                        </span>
                        <span className="text-sm font-medium">Inquiries</span>
                    </div>
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        4
                    </span>
                </Link> */}
                {/* <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">
                    System
                </p>
                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all group"
                >
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
                        settings
                    </span>
                    <span className="text-sm font-medium">Settings</span>
                </Link> */}
            </div>

            <div className="px-4 pb-2">
                <button
                    onClick={async () => {
                        await logout();
                        router.push("/admin/login");
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        logout
                    </span>
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div
                        className="size-9 rounded-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQ8Y1jOJnoUYWAi9jTPt_ednGuP0SITrTHvYhDfUw4_JthvwZlQN1KOXtUKV1bwMU1jWcZ0IO2UtsZtCC2zznEQpnXUZMgMlhxEphpIS89PKf7kLbDsCFOfqkXMi90JmuT7k_QC7W62V1Fj5FLnlRJCtvm5T7jfWZMhR5mwyYiOMd8flpHewforD6DKxkjFH3ocMY97yDHjTK4k78HLMubifN9hHrPQ1njF6tjzvinzhK6b3Tlf_RfRLXu5WHSzr7s2dLbgMsqk7FS')",
                        }}
                    ></div>
                    <div className="flex flex-col items-start">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Risqi Ahmad
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            View Profile
                        </p>
                    </div>
                </button>
            </div>
        </aside>
    );
}
