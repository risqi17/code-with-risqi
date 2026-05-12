"use client";

import { deleteShopProductAction } from "@/app/actions/shop";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export function DeleteShopProductButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    async function handleDelete() {
        setLoading(true);
        await deleteShopProductAction(id);
        setLoading(false);
        setShowConfirm(false);
    }

    return (
        <>
            <Modal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                title="Delete Shop Product"
                description="Are you sure you want to delete this shop product? This action cannot be undone."
                type="danger"
                confirmText="Delete Product"
                onConfirm={handleDelete}
                isLoading={loading}
            />

            <button
                onClick={() => setShowConfirm(true)}
                disabled={loading}
                className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                title="Delete Product"
            >
                <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
        </>
    );
}
