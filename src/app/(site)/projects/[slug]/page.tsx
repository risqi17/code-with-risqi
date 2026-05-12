
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getNextProject } from "@/lib/db";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/image-gallery";
import { cache } from "react";

// Cache the project fetch to dedupe requests between generateMetadata and Page
const getProject = cache((slug: string) => getProjectBySlug(slug));

interface PageProps {
    params: Promise<{ slug: string }>;
}

import type { Metadata } from "next";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} - Risqi Ahmad`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [
                {
                    url: project.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
            type: "article",
        },
    };
}

export default async function ProjectDetail({ params }: PageProps) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        notFound();
    }

    const nextProject = getNextProject(project.id);

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Project",
        "name": project.title,
        "description": project.description,
        "image": project.imageUrl,
        "dateCreated": project.year,
        "creator": {
            "@type": "Person",
            "name": "Risqi Ahmad"
        },
        "url": `https://risqiahmad.com/projects/${project.slug}`
    };

    return (
        <main className="bg-background-light dark:bg-background-dark min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="site-container py-6">
                <div className="relative w-full rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px] flex items-end p-6 md:p-8 group border border-gray-200 dark:border-gray-800">
                    {/* Media Background */}
                    {project.videoUrl ? (
                        <video
                            src={project.videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : project.imageUrl && (project.imageUrl.startsWith('/') || project.imageUrl.startsWith('http')) ? (
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-slate-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-600 text-5xl">
                                image
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-slate-950/72 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 w-full max-w-3xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-primary text-xs font-bold mb-4 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[16px]">verified</span> Studi Kasus
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight font-display">
                            {project.title}
                        </h1>
                        <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="site-container py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar (Sticky) */}
                <aside className="lg:col-span-4 order-2 lg:order-1">
                    <div className="lg:sticky lg:top-24 space-y-8">
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-light dark:text-white font-display">
                                <span className="material-symbols-outlined text-primary dark:text-accent">info</span> Detail Proyek
                            </h3>
                            <div className="space-y-6">
                                <div className="group">
                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium mb-1">Klien</p>
                                    <p className="text-text-light dark:text-white font-semibold flex items-center gap-2">
                                        <span className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">C</span>
                                        {project.client}
                                    </p>
                                </div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>
                                <div>
                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium mb-1">Tahun</p>
                                    <p className="text-text-light dark:text-white font-semibold">{project.year}</p>
                                </div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>
                                <div>
                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium mb-1">Kategori</p>
                                    <p className="text-text-light dark:text-white font-semibold">{project.category}</p>
                                </div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>
                                <div>
                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium mb-3">Layanan</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.services.split(',').map((s, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white text-xs font-medium rounded-lg border border-slate-200 dark:border-transparent">
                                                {s.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Link href="#" className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-12 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all">
                                Kunjungi Situs Langsung <span className="material-symbols-outlined text-sm">arrow_outward</span>
                            </Link>
                        </div>

                        {/* Quick Stats (Static for demo) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-teal-50 dark:bg-gray-800 rounded-xl p-4 text-center border border-teal-100 dark:border-gray-700">
                                <p className="text-2xl font-black text-primary dark:text-accent">+45%</p>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium uppercase tracking-wide">Retensi Pengguna</p>
                            </div>
                            <div className="bg-teal-50 dark:bg-gray-800 rounded-xl p-4 text-center border border-teal-100 dark:border-gray-700">
                                <p className="text-2xl font-black text-primary dark:text-accent">2.5s</p>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium uppercase tracking-wide">Rata-rata Waktu Muat</p>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* content */}
                <article className="lg:col-span-8 order-1 lg:order-2 space-y-16">
                    {/* Main Content Area */}
                    <div className="space-y-12">
                        {/* Video Player */}
                        {project.videoUrl && (
                            <div className="rounded-xl overflow-hidden bg-black border border-gray-200 dark:border-gray-800">
                                <video
                                    src={project.videoUrl}
                                    controls
                                    className="w-full aspect-video object-cover"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        {/* Structured Project Details */}
                        {project.details && project.details.overview_title && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold mb-5 text-text-light dark:text-white tracking-tight font-display">
                                        {project.details.overview_title}
                                    </h2>
                                    <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-5">
                                        {project.details.overview_desc_1}
                                    </p>
                                    <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                        {project.details.overview_desc_2}
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-surface-dark rounded-xl p-5 border-l-4 border-primary dark:border-accent my-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 shrink-0">
                                            <span className="material-symbols-outlined">warning</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-3 text-text-light dark:text-white font-display">
                                                {project.details.challenge_title}
                                            </h3>
                                            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                                {project.details.challenge_desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Process Steps */}
                        {project.processSteps && project.processSteps.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-white tracking-tight font-display">Proses</h2>
                                <div className="space-y-12">
                                    {project.processSteps.map((step, idx) => (
                                        <div key={idx} className="flex gap-5">
                                            <div className="flex flex-col items-center">
                                                <div className={`size-10 rounded-full flex items-center justify-center font-bold text-lg z-10 
                                                    ${idx === 0
                                                        ? 'bg-primary dark:bg-accent text-white shadow-lg shadow-primary/30'
                                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white'
                                                    }`}
                                                >
                                                    {idx + 1}
                                                </div>
                                                {idx < project.processSteps!.length - 1 && (
                                                    <div className="w-0.5 bg-gray-200 dark:bg-gray-800 flex-1 my-2"></div>
                                                )}
                                            </div>
                                            <div className="pb-8 w-full">
                                                <h4 className="text-xl font-bold mb-2 text-text-light dark:text-white">{step.title}</h4>
                                                <p className="text-text-muted-light dark:text-text-muted-dark">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Text Content (Legacy or Markdown) */}
                        {project.content && (
                            <div className="prose dark:prose-invert max-w-none mt-12" dangerouslySetInnerHTML={{ __html: project.content }} />
                        )}

                        {/* Gallery Section */}
                        {project.gallery && (
                            <div className="mt-12">
                                <h3 className="text-xl font-bold mb-5 text-text-light dark:text-white font-display">Galeri Proyek</h3>
                                <ImageGallery images={project.gallery.split(',')} />
                            </div>
                        )}
                    </div>
                </article>
            </div>

            {/* Next Project Navigation */}
            {nextProject && (
                <section className="w-full py-14 px-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="max-w-[960px] mx-auto">
                        <p className="text-center text-text-muted-light dark:text-text-muted-dark font-medium mb-4 uppercase tracking-widest text-xs">Proyek Selanjutnya</p>
                        <Link href={`/projects/${nextProject.slug}`} className="group block relative rounded-xl overflow-hidden aspect-[21/9] md:aspect-[3/1] border border-gray-200 dark:border-gray-800">
                            {nextProject.imageUrl && (nextProject.imageUrl.startsWith('/') || nextProject.imageUrl.startsWith('http')) ? (
                                <Image
                                    src={nextProject.imageUrl}
                                    alt={nextProject.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 960px) 100vw, 960px"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-gray-500 text-5xl">image</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-300 flex flex-col items-center justify-center p-5 text-center">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{nextProject.title}</h3>
                                <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                    <span className="text-sm font-medium">Lihat Studi Kasus</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

        </main>
    );
}
