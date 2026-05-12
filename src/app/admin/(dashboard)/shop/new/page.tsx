import { ShopProductForm } from "@/components/admin/shop-product-form";

export default function NewShopProductPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold dark:text-white text-gray-900 tracking-tight">
                    New Shop Product
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Create a product for the public digital shop.
                </p>
            </div>

            <ShopProductForm />
        </div>
    );
}
