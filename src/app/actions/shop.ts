"use server";

import { createShopProduct, deleteShopProduct, ShopProductInput, updateShopProduct } from "@/lib/db";
import { revalidatePath } from "next/cache";

function normalizeJsonArray(value: FormDataEntryValue | null): string {
    if (typeof value !== "string" || !value.trim()) {
        return "[]";
    }

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? JSON.stringify(parsed) : "[]";
    } catch {
        return "[]";
    }
}

function getShopProductInput(formData: FormData): ShopProductInput {
    return {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        shortDescription: formData.get("shortDescription") as string,
        description: formData.get("description") as string,
        coverImage: formData.get("coverImage") as string,
        screenshots: normalizeJsonArray(formData.get("screenshots")),
        videoUrl: (formData.get("videoUrl") as string) || "",
        specifications: normalizeJsonArray(formData.get("specifications")),
        includes: normalizeJsonArray(formData.get("includes")),
        priceText: formData.get("priceText") as string,
        isPublished: formData.get("isPublished") === "on" ? 1 : 0,
        sortOrder: Number(formData.get("sortOrder") || 0),
    };
}

function revalidateShop() {
    revalidatePath("/shop");
    revalidatePath("/admin/shop");
}

export async function createShopProductAction(formData: FormData) {
    try {
        createShopProduct(getShopProductInput(formData));
        revalidateShop();
        return { success: true };
    } catch (error) {
        console.error("Failed to create shop product:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to create shop product" };
    }
}

export async function updateShopProductAction(id: number, formData: FormData) {
    try {
        updateShopProduct(id, getShopProductInput(formData));
        revalidateShop();
        return { success: true };
    } catch (error) {
        console.error("Failed to update shop product:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to update shop product" };
    }
}

export async function deleteShopProductAction(id: number) {
    deleteShopProduct(id);
    revalidateShop();
    return { success: true };
}
