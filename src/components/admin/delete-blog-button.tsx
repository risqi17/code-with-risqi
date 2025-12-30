"use client";

import { deleteBlogAction } from "@/app/actions/blogs";
import { useState } from "react";

export function DeleteBlogButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
            setLoading(true);
            await deleteBlogAction(id);
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
            title="Delete Blog"
        >
            <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
    );
}
