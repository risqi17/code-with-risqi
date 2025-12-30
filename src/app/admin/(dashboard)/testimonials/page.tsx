import Link from 'next/link';
import { getTestimonials } from '@/lib/db';
import { TestimonialsTable } from '@/components/admin/testimonials-table';

export const revalidate = 0;

export default function AdminTestimonialsPage() {
    const testimonials = getTestimonials();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-text-light dark:text-white">
                        Testimonials
                    </h1>
                    <p className="text-text-muted-light dark:text-text-muted-dark mt-1">
                        Manage client reviews and feedback.
                    </p>
                </div>
                <Link
                    href="/admin/testimonials/new"
                    className="bg-primary hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-transform hover:scale-105 shadow-lg flex items-center justify-center md:justify-start"
                >
                    <span className="material-symbols-outlined text-lg mr-2">add</span>
                    Create New
                </Link>
            </div>

            {/* Table */}
            <TestimonialsTable testimonials={testimonials} />
        </div>
    );
}
