import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Only run for /admin routes
    if (path.startsWith("/admin")) {
        const isAuthenticated = request.cookies.get("admin_session")?.value === "true";

        // If trying to access login page while authenticated, redirect to dashboard
        if (path === "/admin/login" && isAuthenticated) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        // If trying to access protected admin routes while NOT authenticated
        // (excluding login page itself)
        if (!isAuthenticated && path !== "/admin/login") {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
