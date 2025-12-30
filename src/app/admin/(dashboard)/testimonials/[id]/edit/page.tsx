import { notFound } from 'next/navigation';
import { getTestimonialById } from '@/lib/db';
import { TestimonialForm } from '@/components/admin/testimonial-form';

export default async function EditTestimonialPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const testimonialId = parseInt(id, 10);
    const testimonial = getTestimonialById(testimonialId);

    if (!testimonial) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-display text-text-light dark:text-white">
                    Edit Testimonial
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-1">
                    Update client review details.
                </p>
            </div>

            <TestimonialForm testimonial={testimonial} />
        </div>
    );
}
