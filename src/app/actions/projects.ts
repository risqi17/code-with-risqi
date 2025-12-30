"use server";

import { createProject, deleteProject, updateProject } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(formData: FormData) {
    const project = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        client: formData.get("client") as string,
        year: formData.get("year") as string,
        description: formData.get("description") as string,
        services: formData.get("services") as string,
        imageUrl: formData.get("imageUrl") as string,
        videoUrl: formData.get("videoUrl") as string,
        gallery: formData.get("gallery") as string,
        content: formData.get("content") as string,
    };

    createProject(project);
    revalidatePath("/admin/projects");
    revalidatePath("/"); // Revalidate home page as it shows recent projects
    redirect("/admin/projects");
}

export async function updateProjectAction(id: number, formData: FormData) {
    const project = {
        id,
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        client: formData.get("client") as string,
        year: formData.get("year") as string,
        description: formData.get("description") as string,
        services: formData.get("services") as string,
        imageUrl: formData.get("imageUrl") as string,
        content: formData.get("content") as string,
    };

    updateProject(project);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    redirect("/admin/projects");
}

export async function deleteProjectAction(id: number) {
    deleteProject(id);
    revalidatePath("/admin/projects");
    revalidatePath("/");
}
