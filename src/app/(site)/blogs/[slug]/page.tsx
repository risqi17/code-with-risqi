import { getBlogBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import type { ReactNode } from "react";

// Ensure static generation for better performance if possible, or just dynamic
// Since db is local sqlite, we might want to just rely on dynamic rendering or revalidate
export const revalidate = 60;

// Correctly define the input props for the Page component
// param 'slug' comes from the URL
interface PageProps {
    params: Promise<{ slug: string }>;
}

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let tokenIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        const token = match[0];
        const key = `${keyPrefix}-${tokenIndex}`;

        if (token.startsWith("`")) {
            parts.push(
                <code key={key} className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-primary dark:bg-gray-800 dark:text-accent">
                    {token.slice(1, -1)}
                </code>
            );
        } else if (token.startsWith("**")) {
            parts.push(
                <strong key={key} className="font-bold text-text-light dark:text-white">
                    {token.slice(2, -2)}
                </strong>
            );
        } else if (token.startsWith("*")) {
            parts.push(
                <em key={key}>
                    {token.slice(1, -1)}
                </em>
            );
        } else {
            const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

            if (linkMatch) {
                const [, label, href] = linkMatch;
                parts.push(
                    <a
                        key={key}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-semibold text-accent underline-offset-4 hover:underline"
                    >
                        {label}
                    </a>
                );
            }
        }

        tokenIndex += 1;
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
}

function renderMarkdown(markdown: string): ReactNode[] {
    const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n");
    const blocks: ReactNode[] = [];
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];
        const trimmed = line.trim();

        if (!trimmed) {
            index += 1;
            continue;
        }

        if (trimmed.startsWith("```")) {
            const codeLines: string[] = [];
            index += 1;

            while (index < lines.length && !lines[index].trim().startsWith("```")) {
                codeLines.push(lines[index]);
                index += 1;
            }

            blocks.push(
                <pre key={`code-${index}`} className="my-6 overflow-x-auto rounded-xl border border-gray-200 bg-gray-950 p-4 text-sm text-gray-100 dark:border-gray-800">
                    <code>{codeLines.join("\n")}</code>
                </pre>
            );
            index += 1;
            continue;
        }

        const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
        if (heading) {
            const level = heading[1].length;
            const content = renderInlineMarkdown(heading[2], `heading-${index}`);
            const className = "font-bold tracking-tight text-text-light dark:text-white";

            if (level === 1 || level === 2) {
                blocks.push(<h2 key={`heading-${index}`} className={`mt-8 mb-4 text-2xl ${className}`}>{content}</h2>);
            } else if (level === 3) {
                blocks.push(<h3 key={`heading-${index}`} className={`mt-7 mb-3 text-xl ${className}`}>{content}</h3>);
            } else {
                blocks.push(<h4 key={`heading-${index}`} className={`mt-6 mb-3 text-xl ${className}`}>{content}</h4>);
            }

            index += 1;
            continue;
        }

        if (/^>\s?/.test(trimmed)) {
            const quoteLines: string[] = [];

            while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
                quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
                index += 1;
            }

            blocks.push(
                <blockquote key={`quote-${index}`} className="my-8 border-l-4 border-accent bg-teal-50 px-5 py-4 text-text-light dark:bg-gray-800 dark:text-text-dark">
                    {quoteLines.map((quoteLine, quoteIndex) => (
                        <p key={`quote-line-${quoteIndex}`} className="mb-2 last:mb-0">
                            {renderInlineMarkdown(quoteLine, `quote-${index}-${quoteIndex}`)}
                        </p>
                    ))}
                </blockquote>
            );
            continue;
        }

        if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
            const ordered = /^\d+\.\s+/.test(trimmed);
            const items: string[] = [];
            const itemPattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;

            while (index < lines.length && itemPattern.test(lines[index].trim())) {
                items.push(lines[index].trim().replace(itemPattern, ""));
                index += 1;
            }

            const ListTag = ordered ? "ol" : "ul";
            blocks.push(
                <ListTag key={`list-${index}`} className={`my-6 space-y-3 pl-6 text-text-muted-light dark:text-text-muted-dark ${ordered ? "list-decimal" : "list-disc"}`}>
                    {items.map((item, itemIndex) => (
                        <li key={`list-item-${itemIndex}`} className="pl-1 leading-relaxed">
                            {renderInlineMarkdown(item, `list-${index}-${itemIndex}`)}
                        </li>
                    ))}
                </ListTag>
            );
            continue;
        }

        const paragraphLines = [trimmed];
        index += 1;

        while (
            index < lines.length &&
            lines[index].trim() &&
            !/^(#{1,4})\s+/.test(lines[index].trim()) &&
            !/^```/.test(lines[index].trim()) &&
            !/^>\s?/.test(lines[index].trim()) &&
            !/^[-*]\s+/.test(lines[index].trim()) &&
            !/^\d+\.\s+/.test(lines[index].trim())
        ) {
            paragraphLines.push(lines[index].trim());
            index += 1;
        }

        blocks.push(
            <p key={`paragraph-${index}`} className="mb-5 leading-8 text-text-muted-light dark:text-text-muted-dark">
                {renderInlineMarkdown(paragraphLines.join(" "), `paragraph-${index}`)}
            </p>
        );
    }

    return blocks;
}

export default async function BlogDetailPage({ params }: PageProps) {
    // Await params first (Next.js 15+ requirement / good practice)
    const { slug } = await params;

    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-20 pb-16 bg-background-light dark:bg-background-dark">
            <FadeIn>
                <div className="site-container-narrow">
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
                        <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white font-display leading-tight mb-5">
                            {blog.title}
                        </h1>
                        <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            {blog.excerpt}
                        </p>
                    </header>

                    {/* Cover Image */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-800">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <article className="max-w-none text-text-light dark:text-gray-300">
                        {renderMarkdown(blog.content)}
                    </article>
                </div>
            </FadeIn>
        </main>
    );
}
