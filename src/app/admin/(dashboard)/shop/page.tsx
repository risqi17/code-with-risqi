import { ShopProductsTable } from "@/components/admin/shop-products-table";
import { getShopProducts } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0;

export default function AdminShopPage() {
    const products = getShopProducts();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">
                        Digital Shop
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage purchasable digital products and templates.
                    </p>
                </div>
                <Link
                    href="/admin/shop/new"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-gray-900 text-white rounded-lg font-medium transition-colors"
                >
                    <span className="material-symbols-outlined mr-2 text-xl">add</span>
                    New Product
                </Link>
            </div>

            <ShopProductsTable products={products} />
        </div>
    );
}
