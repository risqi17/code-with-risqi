import { ProjectForm } from "@/components/admin/project-form";
import { getProjectById } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(parseInt(id));

    if (!project) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Edit Project
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Update the details of your project.
                </p>
            </div>

            <ProjectForm project={project} isEdit={true} />
        </div>
    );
}
