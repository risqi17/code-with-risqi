"use client";

import { deleteBlogAction } from "@/app/actions/blogs";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";

export function DeleteBlogButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    async function handleDelete() {
        setLoading(true);
        await deleteBlogAction(id);
        setLoading(false);
        setShowConfirm(false);
    }

    return (
        <>
            <Modal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                title="Delete Blog Post"
                description="Are you sure you want to delete this blog post? This action cannot be undone."
                type="danger"
                confirmText="Delete Post"
                onConfirm={handleDelete}
                isLoading={loading}
            />

            <button
                onClick={() => setShowConfirm(true)}
                disabled={loading}
                className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                title="Delete Blog"
            >
                <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
        </>
    );
}
