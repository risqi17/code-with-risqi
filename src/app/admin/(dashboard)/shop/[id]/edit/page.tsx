import { ShopProductForm } from "@/components/admin/shop-product-form";
import { getShopProductById } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditShopProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = getShopProductById(Number(id));

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">
                    Edit Shop Product
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Update product content, price, media, and publish status.
                </p>
            </div>

            <ShopProductForm product={product} isEdit />
        </div>
    );
}
