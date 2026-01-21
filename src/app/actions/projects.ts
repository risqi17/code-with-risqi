"use server";

import { createProject, deleteProject, updateProject, saveProjectDetails, saveProjectProcessSteps, ProjectDetails, ProjectProcessStep } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(formData: FormData) {
    try {
        const project = {
            title: formData.get("title") as string,
            slug: formData.get("slug") as string,
            category: formData.get("category") as string,
            client: formData.get("client") as string,
            year: formData.get("year") as string,
            description: formData.get("description") as string,
            services: formData.get("services") as string, // JSON string or comma separated
            imageUrl: formData.get("imageUrl") as string,
            videoUrl: formData.get("videoUrl") as string,
            gallery: formData.get("gallery") as string,
            content: formData.get("content") as string,
        };

        const projectId = createProject(project) as number;

        // Save Details
        const details: ProjectDetails = {
            project_id: projectId,
            overview_title: formData.get("overview_title") as string,
            overview_desc_1: formData.get("overview_desc_1") as string,
            overview_desc_2: formData.get("overview_desc_2") as string,
            challenge_title: formData.get("challenge_title") as string,
            challenge_desc: formData.get("challenge_desc") as string,
        };
        saveProjectDetails(details);

        // Save Steps
        const stepsJson = formData.get("processSteps") as string;
        if (stepsJson) {
            const steps = JSON.parse(stepsJson) as ProjectProcessStep[];
            saveProjectProcessSteps(projectId, steps);
        }
    } catch (error) {
        console.error("Failed to create project:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to create project" };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function updateProjectAction(id: number, formData: FormData) {
    try {
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

        // Save Details
        const details: ProjectDetails = {
            project_id: id,
            overview_title: formData.get("overview_title") as string,
            overview_desc_1: formData.get("overview_desc_1") as string,
            overview_desc_2: formData.get("overview_desc_2") as string,
            challenge_title: formData.get("challenge_title") as string,
            challenge_desc: formData.get("challenge_desc") as string,
        };
        saveProjectDetails(details);

        // Save Steps
        const stepsJson = formData.get("processSteps") as string;
        if (stepsJson) {
            const steps = JSON.parse(stepsJson) as ProjectProcessStep[];
            saveProjectProcessSteps(id, steps);
        }
    } catch (error) {
        console.error("Failed to update project:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to update project" };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function deleteProjectAction(id: number) {
    deleteProject(id);
    revalidatePath("/admin/projects");
    revalidatePath("/");
}
