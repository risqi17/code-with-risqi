"use server";

import { getPaginatedProjects } from "@/lib/db";

export async function loadMoreProjectsAction(offset: number, limit: number) {
    const projects = getPaginatedProjects(limit, offset);
    return projects;
}
