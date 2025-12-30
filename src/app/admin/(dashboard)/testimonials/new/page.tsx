import { TestimonialForm } from '@/components/admin/testimonial-form';

export default function NewTestimonialPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-display text-text-light dark:text-white">
                    New Testimonial
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-1">
                    Add a new client review to display on the homepage.
                </p>
            </div>

            <TestimonialForm />
        </div>
    );
}
