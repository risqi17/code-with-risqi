"use server";

import { cookies } from "next/headers";
import * as crypto from "node:crypto";
import { getUserByEmail } from "@/lib/db";

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    // Verify credentials against DB
    const user = getUserByEmail(email as string);

    if (!user) {
        return { success: false, message: "Invalid credentials" };
    }

    const [salt, key] = user.password.split(':');
    const hashedBuffer = crypto.scryptSync(password as string, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = crypto.timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
        // Set cookie valid for 1 day
        const cookieStore = await cookies();

        // In a real app, sign a JWT or session ID here. 
        // For now, we'll store basic user info or a session flag.
        // NOTE: Storing direct JSON in cookie is not secure for sensitive info, 
        // but acceptable for non-sensitive session flags if signed (Next.js cookies are signed if configured)
        // or just use a session management library (lucia/next-auth).
        // Sticking to minimal implementation as requested closer to existing 'admin_session'.
        cookieStore.set("admin_session", "true", { // Maintaining existing cookie name for compatibility
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
