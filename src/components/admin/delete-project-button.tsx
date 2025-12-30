"use client";

import { deleteProjectAction } from "@/app/actions/projects";
import { useState } from "react";

export function DeleteProjectButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            setIsDeleting(true);
            await deleteProjectAction(id);
            setIsDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
            title="Delete"
        >
            {isDeleting ? (
                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
            ) : (
                <span className="material-symbols-outlined text-[20px]">delete</span>
            )}
        </button>
    );
}
