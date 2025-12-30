"use server";

import { cookies } from "next/headers";

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    // Mock authentication - In a real app, verify against DB
    if (email === "admin@example.com" && password === "admin123") {
        // Set cookie valid for 1 day
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
}
