import Link from 'next/link';
import Image from 'next/image';
import { Testimonial } from '@/lib/db';
import { DeleteTestimonialButton } from './delete-testimonial-button';

export function TestimonialsTable({ testimonials }: { testimonials: Testimonial[] }) {
    if (testimonials.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 border-dashed">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl text-gray-400">
                        reviews
                    </span>
                </div>
                <h3 className="text-lg font-bold text-text-light dark:text-white mb-1">
                    No Testimonials Found
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-6 max-w-xs text-center">
                    You haven't added any testimonials yet. Start by adding your first client review.
                </p>
                <Link
                    href="/admin/testimonials/new"
                    className="bg-primary hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center"
                >
                    <span className="material-symbols-outlined text-lg mr-2">add</span>
                    Add Testimonial
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[40%]">
                                Client Info
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[30%]">
                                Content Preview
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">
                                Rating
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%] text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {testimonials.map((testimonial) => (
                            <tr
                                key={testimonial.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                            {testimonial.avatarUrl ? (
                                                <Image
                                                    src={testimonial.avatarUrl}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-text-light dark:text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium">
                                                {testimonial.role} at <span className="text-accent">{testimonial.company}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        "{testimonial.content}"
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`material-symbols-outlined text-sm ${i < testimonial.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}>
                                                star
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <Link
                                            href={`/admin/testimonials/${testimonial.id}/edit`}
                                            className="text-gray-400 hover:text-primary transition-colors tooltip"
                                            title="Edit Testimonial"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        <DeleteTestimonialButton id={testimonial.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
