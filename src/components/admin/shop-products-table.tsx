import { ShopProduct } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { DeleteShopProductButton } from "./delete-shop-product-button";

export function ShopProductsTable({ products }: { products: ShopProduct[] }) {
    return (
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                            <th className="p-4 font-medium">Product</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium">Includes</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                    No shop products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-16 rounded-lg overflow-hidden relative bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                                {product.coverImage ? (
                                                    <Image
                                                        src={product.coverImage}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-[20px]">image</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                                                    {product.title}
                                                </p>
                                                <p className="text-xs text-gray-500">/{product.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-gray-900 dark:text-white">
                                        {product.priceText}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                        {product.includes.length} items
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isPublished
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            }`}>
                                            {product.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/shop/${product.slug}`}
                                                className="text-gray-500 hover:text-primary transition-colors"
                                                title="View"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                                            </Link>
                                            <Link
                                                href={`/admin/shop/${product.id}/edit`}
                                                className="text-gray-500 hover:text-primary transition-colors"
                                                title="Edit"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </Link>
                                            <DeleteShopProductButton id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
