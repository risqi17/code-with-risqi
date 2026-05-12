import { ImageGallery } from "@/components/image-gallery";
import { getShopProductBySlug } from "@/lib/db";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProduct = cache((slug: string) => getShopProductBySlug(slug));

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: `${product.title} - Digital Shop`,
        description: product.shortDescription,
        openGraph: {
            title: product.title,
            description: product.shortDescription,
            images: [
                {
                    url: product.coverImage,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
        },
    };
}

export default async function ShopProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) {
        notFound();
    }

    const whatsappMessage = encodeURIComponent(`Halo, saya ingin membeli ${product.title}`);
    const whatsappUrl = `https://wa.me/6285159120300?text=${whatsappMessage}`;
    const galleryImages = product.screenshots.length > 0 ? product.screenshots : [product.coverImage];
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "description": product.shortDescription,
        "image": [product.coverImage, ...product.screenshots],
        "offers": {
            "@type": "Offer",
            "price": product.priceText,
            "availability": "https://schema.org/InStock",
        },
    };

    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="site-section pt-8">
                <div className="site-container">
                    <Link
                        href="/shop"
                        className="inline-flex items-center text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-accent transition-colors mb-8"
                    >
                        <span className="material-symbols-outlined mr-2 text-lg">arrow_back</span>
                        Kembali ke Shop
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                                <Image
                                    src={product.coverImage}
                                    alt={product.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            </div>
                        </div>

                        <aside className="lg:col-span-5 lg:sticky lg:top-24">
                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-5 md:p-6">
                                <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">
                                    Digital Product
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-light dark:text-white font-display mb-4">
                                    {product.title}
                                </h1>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-6">
                                    {product.description}
                                </p>
                                <div className="border-y border-gray-200 dark:border-gray-800 py-5 mb-5">
                                    <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark mb-1">
                                        Harga
                                    </p>
                                    <p className="text-2xl font-bold text-accent">
                                        {product.priceText}
                                    </p>
                                </div>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-accent dark:text-gray-950 dark:hover:bg-teal-200"
                                >
                                    <span className="material-symbols-outlined text-xl">shopping_bag</span>
                                    Beli via WhatsApp
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {product.videoUrl && (
                <section className="pb-14">
                    <div className="site-container-narrow">
                        <h2 className="text-2xl font-bold text-text-light dark:text-white font-display mb-5">
                            Preview Video
                        </h2>
                        <div className="rounded-xl overflow-hidden bg-black border border-gray-200 dark:border-gray-800">
                            <video src={product.videoUrl} controls className="w-full aspect-video object-cover">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </section>
            )}

            <section className="pb-14">
                <div className="site-container-narrow">
                    <h2 className="text-2xl font-bold text-text-light dark:text-white font-display mb-5">
                        Screenshot Produk
                    </h2>
                    <ImageGallery images={galleryImages} />
                </div>
            </section>

            <section className="pb-20">
                <div className="site-container-narrow grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-5">
                        <h2 className="text-xl font-bold text-text-light dark:text-white font-display mb-5">
                            Spesifikasi
                        </h2>
                        {product.specifications.length === 0 ? (
                            <p className="text-text-muted-light dark:text-text-muted-dark">
                                Spesifikasi belum ditambahkan.
                            </p>
                        ) : (
                            <div className="divide-y divide-gray-200 dark:divide-gray-800">
                                {product.specifications.map((spec, index) => (
                                    <div key={`${spec.label}-${index}`} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-4 py-4 first:pt-0 last:pb-0">
                                        <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">
                                            {spec.label}
                                        </p>
                                        <p className="text-sm font-semibold text-text-light dark:text-white">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-5">
                        <h2 className="text-xl font-bold text-text-light dark:text-white font-display mb-5">
                            Yang Termasuk
                        </h2>
                        {product.includes.length === 0 ? (
                            <p className="text-text-muted-light dark:text-text-muted-dark">
                                Daftar include belum ditambahkan.
                            </p>
                        ) : (
                            <ul className="space-y-4">
                                {product.includes.map((item, index) => (
                                    <li key={`${item}-${index}`} className="flex gap-3 text-text-muted-light dark:text-text-muted-dark">
                                        <span className="material-symbols-outlined text-accent text-[20px] mt-0.5">check_circle</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
