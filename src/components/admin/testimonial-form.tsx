'use client';

import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { createTestimonialAction, updateTestimonialAction } from '@/app/actions/testimonials';
import { Testimonial } from '@/lib/db';

type TestimonialFormProps = {
    testimonial?: Testimonial;
    isCustom?: boolean; // If true, allows manual input of details without preset
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-primary hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
            {pending ? (
                <>
                    <span className="material-symbols-outlined animate-spin text-sm mr-2">
                        progress_activity
                    </span>
                    Saving...
                </>
            ) : isEditing ? (
                'Update Testimonial'
            ) : (
                'Create Testimonial'
            )}
        </button>
    );
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
    const isEditing = !!testimonial;
    const action = isEditing ? updateTestimonialAction : createTestimonialAction;

    return (
        <form action={action} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="space-y-6">
                {isEditing && (
                    <input type="hidden" name="id" value={testimonial.id} />
                )}
                {isEditing && (
                    <input type="hidden" name="createdAt" value={testimonial.createdAt} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Client Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-lg">
                                person
                            </span>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                defaultValue={testimonial?.name}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                placeholder="e.g. John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Company / Organization
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-lg">
                                business
                            </span>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                defaultValue={testimonial?.company}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role / Job Title
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-lg">
                                work
                            </span>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                defaultValue={testimonial?.role}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                placeholder="e.g. CEO, Marketing Director"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Rating <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-lg">
                                star
                            </span>
                            <select
                                id="rating"
                                name="rating"
                                required
                                defaultValue={testimonial?.rating || 5}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white appearance-none"
                            >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Avatar URL (Optional)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 material-symbols-outlined text-lg">
                            image
                        </span>
                        <input
                            type="url"
                            id="avatarUrl"
                            name="avatarUrl"
                            defaultValue={testimonial?.avatarUrl}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>
                    <p className="text-xs text-gray-500">Leaving this empty will show a placeholder.</p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Testimonial Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        defaultValue={testimonial?.content}
                        className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white min-h-[150px]"
                        placeholder="Write the testimonial content here..."
                    />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        href="/admin/testimonials"
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </Link>
                    <SubmitButton isEditing={isEditing} />
                </div>
            </div>
        </form>
    );
}
