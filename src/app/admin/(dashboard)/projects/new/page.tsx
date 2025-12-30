import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Create New Project
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Add a new case study to your portfolio.
                </p>
            </div>

            <ProjectForm />
        </div>
    );
}
