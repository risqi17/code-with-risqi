'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createTestimonial, updateTestimonial, deleteTestimonial, Testimonial } from '@/lib/db';

export async function createTestimonialAction(formData: FormData) {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const company = formData.get('company') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const avatarUrl = formData.get('avatarUrl') as string;

    if (!name || !content || !rating) {
        throw new Error('Missing required fields');
    }

    createTestimonial({
        name,
        role,
        company,
        content,
        rating,
        avatarUrl: avatarUrl || undefined,
    });

    revalidatePath('/admin/testimonials');
    revalidatePath('/'); // Update home page as well
    redirect('/admin/testimonials');
}

export async function updateTestimonialAction(formData: FormData) {
    const id = parseInt(formData.get('id') as string, 10);
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const company = formData.get('company') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const avatarUrl = formData.get('avatarUrl') as string;
    const createdAt = formData.get('createdAt') as string; // Preserve original creation date

    if (!id || !name || !content || !rating) {
        throw new Error('Missing required fields');
    }

    updateTestimonial({
        id,
        name,
        role,
        company,
        content,
        rating,
        avatarUrl: avatarUrl || undefined,
        createdAt: createdAt
    });

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    redirect('/admin/testimonials');
}

export async function deleteTestimonialAction(id: number) {
    deleteTestimonial(id);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}
