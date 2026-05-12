"use client";

import { createShopProductAction, updateShopProductAction } from "@/app/actions/shop";
import { ShopProduct, ShopSpecification } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

interface ShopProductFormProps {
    product?: ShopProduct;
    isEdit?: boolean;
}

function splitScreenshots(value: string): string[] {
    return value
        .split(/[\n,]/)
        .map(item => item.trim())
        .filter(Boolean);
}

export function ShopProductForm({ product, isEdit = false }: ShopProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [screenshotsText, setScreenshotsText] = useState(product?.screenshots.join("\n") || "");
    const [specifications, setSpecifications] = useState<ShopSpecification[]>(
        product?.specifications.length ? product.specifications : [{ label: "", value: "" }]
    );
    const [includes, setIncludes] = useState<string[]>(
        product?.includes.length ? product.includes : [""]
    );
    const [alertState, setAlertState] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: "danger" | "success" | "warning";
    }>({
        isOpen: false,
        title: "",
        message: "",
        type: "warning",
    });

    async function handleSubmit(formData: FormData) {
        setLoading(true);

        formData.set("screenshots", JSON.stringify(splitScreenshots(screenshotsText)));
        formData.set("specifications", JSON.stringify(specifications.filter(spec => spec.label.trim() && spec.value.trim())));
        formData.set("includes", JSON.stringify(includes.map(item => item.trim()).filter(Boolean)));

        try {
            const result = isEdit && product
                ? await updateShopProductAction(product.id, formData)
                : await createShopProductAction(formData);

            if (!result.success) {
                setAlertState({
                    isOpen: true,
                    title: "Save Failed",
                    message: result.error || "Unable to save this product.",
                    type: "danger",
                });
                return;
            }

            router.push("/admin/shop");
            router.refresh();
        } catch (error) {
            console.error(error);
            setAlertState({
                isOpen: true,
                title: "Unexpected Error",
                message: "An unexpected error occurred. Please try again.",
                type: "danger",
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

            <form action={handleSubmit} className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Product Title
                        </label>
                        <input
                            name="title"
                            required
                            defaultValue={product?.title}
                            placeholder="Landing Page Template"
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
                            defaultValue={product?.slug}
                            placeholder="landing-page-template"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Price Text
                        </label>
                        <input
                            name="priceText"
                            required
                            defaultValue={product?.priceText}
                            placeholder="Rp 499.000"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Sort Order
                        </label>
                        <input
                            name="sortOrder"
                            type="number"
                            defaultValue={product?.sortOrder ?? 0}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Short Description
                    </label>
                    <textarea
                        name="shortDescription"
                        required
                        rows={2}
                        defaultValue={product?.shortDescription}
                        placeholder="A concise summary for the shop card."
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Full Description
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        defaultValue={product?.description}
                        placeholder="Explain who this product is for and what problem it solves."
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Cover Image URL
                        </label>
                        <input
                            name="coverImage"
                            required
                            defaultValue={product?.coverImage}
                            placeholder="/images/hero-dashboard.png"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Video URL
                        </label>
                        <input
                            name="videoUrl"
                            defaultValue={product?.videoUrl}
                            placeholder="Optional mp4/webm URL"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Screenshot URLs
                    </label>
                    <textarea
                        rows={4}
                        value={screenshotsText}
                        onChange={(event) => setScreenshotsText(event.target.value)}
                        placeholder="One URL per line. Commas are also supported."
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white font-mono text-sm"
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Specifications
                        </label>
                        <button
                            type="button"
                            onClick={() => setSpecifications([...specifications, { label: "", value: "" }])}
                            className="text-xs bg-primary/10 hover:bg-primary/20 text-primary dark:bg-accent/10 dark:text-accent px-2 py-1 rounded"
                        >
                            Add Spec
                        </button>
                    </div>
                    {specifications.map((spec, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                            <input
                                value={spec.label}
                                onChange={(event) => {
                                    const next = [...specifications];
                                    next[index] = { ...next[index], label: event.target.value };
                                    setSpecifications(next);
                                }}
                                placeholder="Label, e.g. Pages"
                                className="px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 dark:text-white"
                            />
                            <input
                                value={spec.value}
                                onChange={(event) => {
                                    const next = [...specifications];
                                    next[index] = { ...next[index], value: event.target.value };
                                    setSpecifications(next);
                                }}
                                placeholder="Value, e.g. 8 sections"
                                className="px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setSpecifications(specifications.filter((_, itemIndex) => itemIndex !== index))}
                                className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label="Remove specification"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            What Includes
                        </label>
                        <button
                            type="button"
                            onClick={() => setIncludes([...includes, ""])}
                            className="text-xs bg-primary/10 hover:bg-primary/20 text-primary dark:bg-accent/10 dark:text-accent px-2 py-1 rounded"
                        >
                            Add Include
                        </button>
                    </div>
                    {includes.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto] gap-3">
                            <input
                                value={item}
                                onChange={(event) => {
                                    const next = [...includes];
                                    next[index] = event.target.value;
                                    setIncludes(next);
                                }}
                                placeholder="Responsive source files"
                                className="px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-800 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setIncludes(includes.filter((_, itemIndex) => itemIndex !== index))}
                                className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label="Remove include"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </div>
                    ))}
                </div>

                <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <input
                        name="isPublished"
                        type="checkbox"
                        defaultChecked={product?.isPublished ?? true}
                        className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Published
                </label>

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
                        className="bg-primary hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : (isEdit ? "Update Product" : "Create Product")}
                    </button>
                </div>
            </form>
        </>
    );
}
