'use client';

import { useState } from 'react';
import { deleteTestimonialAction } from '@/app/actions/testimonials';

import { Modal } from "@/components/ui/modal";

export function DeleteTestimonialButton({ id }: { id: number }) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteTestimonialAction(id);
        setIsDeleting(false);
        setIsConfirming(false);
    };

    return (
        <>
            <Modal
                isOpen={isConfirming}
                onClose={() => setIsConfirming(false)}
                title="Delete Testimonial"
                description="Are you sure you want to delete this testimonial? This action cannot be undone."
                type="danger"
                confirmText="Delete Testimonial"
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />

            <button
                onClick={() => setIsConfirming(true)}
                className="text-gray-400 hover:text-red-500 transition-colors tooltip"
                title="Delete Testimonial"
            >
                <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
        </>
    );
}
