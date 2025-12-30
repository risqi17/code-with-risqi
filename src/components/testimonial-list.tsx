'use client';

import Image from 'next/image';
import { Testimonial } from '@/lib/db';

export function TestimonialList({ testimonials }: { testimonials: Testimonial[] }) {
    if (testimonials.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-text-muted-light dark:text-text-muted-dark">
                    Belum ada testimoni. Jadilah klien pertama kami!
                </p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
                <div
                    key={testimonial.id}
                    className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative hover:border-primary/20 transition-colors"
                >
                    <span className="material-symbols-outlined text-4xl text-accent mb-4 block">
                        format_quote
                    </span>
                    <p className="text-text-muted-light dark:text-text-muted-dark mb-8 leading-relaxed italic line-clamp-4">
                        "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative flex-shrink-0">
                                {testimonial.avatarUrl ? (
                                    <Image
                                        src={testimonial.avatarUrl}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-sm">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-text-light dark:text-white">
                                    {testimonial.name}
                                </h4>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                                    {testimonial.role} at {testimonial.company}
                                </p>
                            </div>
                        </div>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`material-symbols-outlined text-sm ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'
                                        }`}
                                >
                                    star
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
