"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const BREADCRUMB_MAP: Record<string, string> = {
    admin: "Dashboard",
    projects: "Projects",
    blogs: "Blogs",
    testimonials: "Testimonials",
    new: "Create New",
    edit: "Edit",
    settings: "Settings",
    inquiries: "Inquiries",
};

export function AdminBreadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // If we are just at /admin, show only "Dashboard"
    // Actually, usually "Home > Dashboard" or just "Dashboard"

    // Let's assume structure: Dashboard > Projects > Edit

    const breadcrumbs = segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;

        let label = BREADCRUMB_MAP[segment] || segment;

        // Improve label for "new" or "edit" if possible, but basic mapping is fine for now.
        // If segment is a number (ID), maybe label it as "Details" or just the ID?
        if (!isNaN(Number(segment))) {
            label = `#${segment}`;
        }

        // If it's the last segment, it's the current page
        const isLast = index === segments.length - 1;

        return {
            label,
            path,
            isLast
        };
    });

    return (
        <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
                <Fragment key={crumb.path}>
                    {index > 0 && (
                        <span className="material-symbols-outlined text-gray-400 text-base">
                            chevron_right
                        </span>
                    )}

                    {crumb.isLast ? (
                        <span className="text-gray-900 dark:text-white font-medium capitalize">
                            {crumb.label}
                        </span>
                    ) : (
                        <Link
                            href={crumb.path}
                            className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors capitalize"
                        >
                            {crumb.label}
                        </Link>
                    )}
                </Fragment>
            ))}
        </div>
    );
}
