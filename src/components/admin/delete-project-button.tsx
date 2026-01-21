"use client";

import { deleteProjectAction } from "@/app/actions/projects";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";

export function DeleteProjectButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        await deleteProjectAction(id);
        setIsDeleting(false);
        setShowConfirm(false);
    }

    return (
        <>
            <Modal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone and will permanently remove the project and its details."
                type="danger"
                confirmText="Delete Project"
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />

            <button
                onClick={() => setShowConfirm(true)}
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
        </>
    );
}
