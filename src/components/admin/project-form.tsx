"use client";

import { createProjectAction, updateProjectAction } from "@/app/actions/projects";
import { Project } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

interface ProcessStep {
    title: string;
    description: string;
}

interface ProjectFormProps {
    project?: Project;
    isEdit?: boolean;
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Builder State
    const [useBuilder, setUseBuilder] = useState(true);
    const [overview, setOverview] = useState({
        title: project?.details?.overview_title || "Gambaran Proyek",
        description1: project?.details?.overview_desc_1 || "",
        description2: project?.details?.overview_desc_2 || ""
    });
    const [challenges, setChallenges] = useState({
        title: project?.details?.challenge_title || "Tantangan",
        description: project?.details?.challenge_desc || ""
    });
    const [processSteps, setProcessSteps] = useState<ProcessStep[]>(
        project?.processSteps && project.processSteps.length > 0
            ? project.processSteps
            : []
    );
    // Content state to sync with textarea
    const [contentValue, setContentValue] = useState(project?.content || "");

    useEffect(() => {
        if (project) {
            if (project.details) {
                setOverview({
                    title: project.details.overview_title,
                    description1: project.details.overview_desc_1,
                    description2: project.details.overview_desc_2
                });
                setChallenges({
                    title: project.details.challenge_title,
                    description: project.details.challenge_desc
                });
            }
            if (project.processSteps && project.processSteps.length > 0) {
                setProcessSteps(project.processSteps);
            }
            if (project.content) {
                setContentValue(project.content);
                setUseBuilder(false); // If content exists, assume builder was not used or content was manually edited
            }
        }
    }, [project]);


    function generateHtml() {
        // Generates valid HTML string (not JSX fragments)
        const html = `
            <div>
                {/* Overview */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-text-light dark:text-white tracking-tight font-display">${overview.title}</h2>
                    <p className="text-lg text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                        ${overview.description1}
                    </p>
                    <p className="text-lg text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                        ${overview.description2}
                    </p>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 border-l-4 border-primary dark:border-accent shadow-sm mt-8 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 shrink-0">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-text-light dark:text-white font-display">${challenges.title}</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                ${challenges.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-8 text-text-light dark:text-white tracking-tight font-display">Proses</h2>
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="size-10 rounded-full bg-primary dark:bg-accent text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30 z-10">1</div>
                                <div className="w-0.5 bg-gray-200 dark:bg-gray-800 flex-1 my-2"></div>
                            </div>
                            <div className="pb-8 w-full">
                                <h4 className="text-xl font-bold mb-2 text-text-light dark:text-white">${processSteps[0]?.title || ""}</h4>
                                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                                    ${processSteps[0]?.description || ""}
                                </p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold text-lg z-10">2</div>
                                <div className="w-0.5 bg-gray-200 dark:bg-gray-800 flex-1 my-2"></div>
                            </div>
                            <div className="pb-8 w-full">
                                <h4 className="text-xl font-bold mb-2 text-text-light dark:text-white">${processSteps[1]?.title || ""}</h4>
                                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                                    ${processSteps[1]?.description || ""}
                                </p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold text-lg z-10">3</div>
                            </div>
                            <div className="w-full">
                                <h4 className="text-xl font-bold mb-2 text-text-light dark:text-white">${processSteps[2]?.title || ""}</h4>
                                <p className="text-text-muted-light dark:text-text-muted-dark">
                                    ${processSteps[2]?.description || ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        setContentValue(html.trim());
        setUseBuilder(false); // Close builder after generating
    }

    const [alertState, setAlertState] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: "danger" | "success" | "warning";
    }>({
        isOpen: false,
        title: "",
        message: "",
        type: "warning"
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission
        setLoading(true);

        const formData = new FormData(event.currentTarget); // Create FormData from the current form

        if (useBuilder) {
            // Add builder state to formData
            formData.append("overview_title", overview.title);
            formData.append("overview_desc_1", overview.description1);
            formData.append("overview_desc_2", overview.description2);
            formData.append("challenge_title", challenges.title);
            formData.append("challenge_desc", challenges.description);
            formData.append("processSteps", JSON.stringify(processSteps));
            // Ensure content is empty if builder is used, so action can reconstruct it
            formData.set("content", "");
        } else {
            // If builder is not used, use the contentValue directly
            formData.set("content", contentValue);
            // Clear builder-related fields if they exist from previous state
            formData.set("overview_title", "");
            formData.set("overview_desc_1", "");
            formData.set("overview_desc_2", "");
            formData.set("challenge_title", "");
            formData.set("challenge_desc", "");
            formData.set("processSteps", "[]");
        }

        try {
            let result;
            if (isEdit && project) {
                result = await updateProjectAction(project.id, formData);
            } else {
                result = await createProjectAction(formData);
            }

            if (result && !result.success && result.error) {
                setAlertState({
                    isOpen: true,
                    title: "Action Failed",
                    message: result.error,
                    type: "danger"
                });
            } else if (result && result.success) {
                router.push("/admin/projects");
                router.refresh(); // Ensure the list updates
            }
        } catch (error) {
            console.error(error);
            setAlertState({
                isOpen: true,
                title: "Unexpected Error",
                message: "An unexpected error occurred. Please try again.",
                type: "danger"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                isOpen={alertState.isOpen}
                onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                title={alertState.title}
                description={alertState.message}
                type={alertState.type}
                confirmText="Close"
                onConfirm={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                showCancel={false}
            />

            <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Project Title
                        </label>
                        <input
                            name="title"
                            required
                            defaultValue={project?.title}
                            placeholder="e.g. Fintech Branding"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Slug
                        </label>
                        <input
                            name="slug"
                            required
                            defaultValue={project?.slug}
                            placeholder="e.g. fintech-branding"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Category
                        </label>
                        <input
                            name="category"
                            required
                            defaultValue={project?.category}
                            placeholder="e.g. Identity, Web Design"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Client
                        </label>
                        <input
                            name="client"
                            required
                            defaultValue={project?.client}
                            placeholder="e.g. Acme Corp"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Year
                        </label>
                        <input
                            name="year"
                            required
                            defaultValue={project?.year}
                            placeholder="e.g. 2023"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Services (Comma separated)
                        </label>
                        <input
                            name="services"
                            required
                            defaultValue={project?.services}
                            placeholder="e.g. Branding, UI/UX"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Image URL
                    </label>
                    <input
                        name="imageUrl"
                        required
                        defaultValue={project?.imageUrl}
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Video URL (Optional)
                    </label>
                    <input
                        name="videoUrl"
                        defaultValue={project?.videoUrl}
                        placeholder="https://... (mp4/webm)"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">If provided, this video will autoplay in thumbnails.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Gallery Image URLs (Optional)
                    </label>
                    <textarea
                        name="gallery"
                        rows={3}
                        defaultValue={project?.gallery}
                        placeholder="https://image1.jpg, https://image2.jpg (Comma separated)"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">Add multiple image URLs separated by commas for the project gallery.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Short Description
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={2}
                        defaultValue={project?.description}
                        placeholder="Brief overview of the project"
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Structured Case Study Details
                        </label>
                        <button
                            type="button"
                            onClick={() => setUseBuilder(!useBuilder)}
                            className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white px-2 py-1 rounded transition-colors"
                        >
                            {useBuilder ? "Hide Details" : "Show Details"}
                        </button>
                        <input type="hidden" name="processSteps" value={JSON.stringify(processSteps)} />
                    </div>

                    {useBuilder && (
                        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 space-y-6">
                            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-2">
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Builder Mode</h3>
                                <p className="text-xs text-gray-500">Fill in the fields below and click "Generate" to populate the content field with the standard layout.</p>
                            </div>

                            {/* Overview Section */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">1. Overview</h4>
                                <input
                                    name="overview_title"
                                    value={overview.title}
                                    onChange={e => setOverview({ ...overview, title: e.target.value })}
                                    placeholder="Section Title (e.g. Gambaran Proyek)"
                                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
                                />
                                <textarea
                                    name="overview_desc_1"
                                    value={overview.description1}
                                    onChange={e => setOverview({ ...overview, description1: e.target.value })}
                                    placeholder="Paragraph 1 (Problem context...)"
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
                                />
                                <textarea
                                    name="overview_desc_2"
                                    value={overview.description2}
                                    onChange={e => setOverview({ ...overview, description2: e.target.value })}
                                    placeholder="Paragraph 2 (Goal/Solution...)"
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
                                />
                            </div>

                            {/* Challenges Section */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">2. Challenges</h4>
                                <input
                                    name="challenge_title"
                                    value={challenges.title}
                                    onChange={e => setChallenges({ ...challenges, title: e.target.value })}
                                    placeholder="Section Title (e.g. Tantangan)"
                                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
                                />
                                <textarea
                                    name="challenge_desc"
                                    value={challenges.description}
                                    onChange={e => setChallenges({ ...challenges, description: e.target.value })}
                                    placeholder="What were the main challenges?"
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
                                />
                            </div>

                            {/* Process Section */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">3. Process (Steps)</h4>
                                    <button
                                        type="button"
                                        onClick={() => setProcessSteps([...processSteps, { title: "", description: "" }])}
                                        className="text-xs bg-primary/10 hover:bg-primary/20 text-primary dark:bg-accent/10 dark:hover:bg-accent/20 dark:text-accent font-medium px-2 py-1 rounded transition-colors flex items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-xs">add</span> Add Step
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {processSteps.map((step, idx) => (
                                        <div key={idx} className="flex gap-3 items-start bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-400 font-medium">Step {idx + 1}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newSteps = processSteps.filter((_, i) => i !== idx);
                                                            setProcessSteps(newSteps);
                                                        }}
                                                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                        title="Remove Step"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                                <input
                                                    value={step.title}
                                                    onChange={e => {
                                                        const newSteps = [...processSteps];
                                                        newSteps[idx].title = e.target.value;
                                                        setProcessSteps(newSteps);
                                                    }}
                                                    placeholder="Step Title"
                                                    className="w-full px-3 py-2 text-sm rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                                                />
                                                <textarea
                                                    value={step.description}
                                                    onChange={e => {
                                                        const newSteps = [...processSteps];
                                                        newSteps[idx].description = e.target.value;
                                                        setProcessSteps(newSteps);
                                                    }}
                                                    placeholder="Step Description"
                                                    rows={2}
                                                    className="w-full px-3 py-2 text-sm rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {processSteps.length === 0 && (
                                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                        <p className="text-sm text-gray-500 mb-2">No process steps added yet.</p>
                                        <button
                                            type="button"
                                            onClick={() => setProcessSteps([{ title: "", description: "" }])}
                                            className="text-sm text-primary hover:underline font-medium"
                                        >
                                            Add first step
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Additional Content (Optional HTML/Markdown)
                    </label>
                    <textarea
                        name="content"
                        rows={6}
                        value={contentValue}
                        onChange={(e) => setContentValue(e.target.value)}
                        placeholder="Additional custom content that appears after the structured sections..."
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white font-mono text-sm"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : (isEdit ? "Update Project" : "Create Project")}
                    </button>
                </div>
            </form>
        </>
    );
}
