'use client';

import { useState } from 'react';
import { deleteTestimonialAction } from '@/app/actions/testimonials';

export function DeleteTestimonialButton({ id }: { id: number }) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteTestimonialAction(id);
        setIsDeleting(false);
    };

    if (isConfirming) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsConfirming(false)}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded hover:bg-red-100 transition-colors"
                >
                    {isDeleting ? '...' : 'Confirm'}
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setIsConfirming(true)}
            className="text-gray-400 hover:text-red-500 transition-colors tooltip"
            title="Delete Project"
        >
            <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
    );
}
