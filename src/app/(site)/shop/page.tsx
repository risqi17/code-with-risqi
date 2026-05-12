import { getPublishedShopProducts } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export const metadata = {
    title: "Digital Shop",
    description: "Template, produk digital, dan paket siap pakai dari Code with Risqi.",
};

export default function ShopPage() {
    const products = getPublishedShopProducts();

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark">
            <section className="site-section pb-10">
                <div className="site-container">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">
                            Digital Shop
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-white font-display">
                            Produk digital siap pakai untuk mempercepat pekerjaan Anda.
                        </h1>
                        <p className="mt-5 text-base leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                            Pilih template, paket, atau aset digital yang sudah disiapkan dengan struktur rapi.
                            Lihat detailnya, lalu pesan langsung lewat WhatsApp.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="site-container">
                    {products.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-8 text-center">
                            <h2 className="text-xl font-bold text-text-light dark:text-white mb-3">
                                Produk belum tersedia
                            </h2>
                            <p className="text-text-muted-light dark:text-text-muted-dark">
                                Produk digital akan ditampilkan di sini setelah dipublikasikan dari admin.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop/${product.slug}`}
                                    className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-4 hover:border-accent transition-colors"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
                                        <Image
                                            src={product.coverImage}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-text-light dark:text-white font-display mb-2">
                                                {product.title}
                                            </h2>
                                            <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark line-clamp-3">
                                                {product.shortDescription}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                            <span className="text-lg font-bold text-accent">
                                                {product.priceText}
                                            </span>
                                            <span className="inline-flex items-center text-sm font-semibold text-text-light dark:text-white group-hover:text-accent transition-colors">
                                                Lihat Detail
                                                <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
