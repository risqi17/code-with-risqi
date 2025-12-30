import { getBlogBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FadeIn } from "@/components/fade-in";

// Ensure static generation for better performance if possible, or just dynamic
// Since db is local sqlite, we might want to just rely on dynamic rendering or revalidate
export const revalidate = 60;

// Correctly define the input props for the Page component
// param 'slug' comes from the URL
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    // Await params first (Next.js 15+ requirement / good practice)
    const { slug } = await params;

    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background-light dark:bg-background-dark">
            <FadeIn>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link
                            href="/#blogs"
                            className="inline-flex items-center text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-accent transition-colors"
                        >
                            <span className="material-symbols-outlined mr-2 text-lg">arrow_back</span>
                            Kembali ke Artikel
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                            <span>{blog.author}</span>
                            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                            <span>
                                {new Date(blog.publishedAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-white font-display leading-tight mb-6">
                            {blog.title}
                        </h1>
                        <p className="text-lg text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            {blog.excerpt}
                        </p>
                    </header>

                    {/* Cover Image */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <article className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-img:rounded-2xl max-w-none text-text-light dark:text-gray-300">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {blog.content}
                        </ReactMarkdown>
                    </article>
                </div>
            </FadeIn>
        </main>
    );
}
