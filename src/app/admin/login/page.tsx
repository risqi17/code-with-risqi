"use client";

import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");

        const result = await login(formData);

        if (result.success) {
            router.push("/admin");
        } else {
            setError(result.message || "Login failed");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid items-center justify-center p-4 bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-sm bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <div className="size-12 rounded-lg bg-primary mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/30 mb-4">
                        AD
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Enter your credentials to access the console
                    </p>
                </div>

                <form action={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="admin@example.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/10 py-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-primary hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
