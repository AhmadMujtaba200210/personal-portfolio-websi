import { getBlogBySlug, getBlogs, getSiteSettings } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

function stripTags(html: string) {
    return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/&amp;/g, "and")
        .replace(/&#39;/g, "")
        .replace(/&quot;/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function addHeadingIds(html: string) {
    const headings: { id: string; text: string; level: number }[] = [];
    const used = new Set<string>();
    let autoId = 0;

    const nextId = (text: string) => {
        const base = slugify(text) || `section-${autoId++}`;
        let id = base;
        let i = 1;
        while (used.has(id)) {
            id = `${base}-${i++}`;
        }
        used.add(id);
        return id;
    };

    const withIds = html.replace(/<h([2-3])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
        const existing = attrs.match(/\sid=["']([^"']+)["']/i);
        const text = stripTags(inner);
        const id = existing?.[1] || nextId(text);
        headings.push({ id, text, level: Number(level) });
        if (existing) return match;
        return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    });

    return { html: withIds, headings };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    const settings = await getSiteSettings();

    if (!blog) return { title: "Post Not Found" };

    return {
        title: `${blog.title} | ${settings["SEO_TITLE"] ? settings["SEO_TITLE"].replace("%s", "Blog") : "Ahmad Mujtaba"}`,
        description: blog.excerpt || blog.title,
    };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const { html, headings } = addHeadingIds(blog.content || "");
    const related = (await getBlogs()).filter((post) => post.slug !== blog.slug).slice(0, 3);

    return (
        <article className="min-h-screen pt-16 pb-20 px-6 md:px-10 max-w-3xl mx-auto space-y-8">
            <header className="space-y-3">
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-gray-400">
                    {blog.categories?.[0]?.name && <span>{blog.categories[0].name}</span>}
                    {blog.readingTime && <span>• {blog.readingTime} min read</span>}
                    {blog.author?.name && <span>• {blog.author.name}</span>}
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                    {blog.title}
                </h1>

                <p className="text-[11px] text-gray-500 uppercase tracking-[0.25em]">
                    {new Date(blog.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>

                {blog.excerpt && (
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {blog.excerpt}
                    </p>
                )}

                {headings.length > 0 ? (
                    <div className="mt-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-2">
                            On this page
                        </p>
                        <div className="space-y-1">
                            {headings.map((h) => (
                                <a
                                    key={h.id}
                                    href={`#${h.id}`}
                                    className={
                                        "block text-sm transition-colors " +
                                        (h.level === 3 ? "pl-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" : "text-gray-600 dark:text-gray-300 hover:text-gray-900")
                                    }
                                >
                                    {h.text}
                                </a>
                            ))}
                        </div>
                    </div>
                ) : null}
            </header>

            <div className="space-y-8">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                    {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} className="w-full h-auto object-cover" />
                    ) : (
                        <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-900" />
                    )}
                </div>

                <div
                    className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-semibold prose-headings:tracking-tight
                    prose-a:text-accent-blue prose-img:rounded-lg
                    prose-blockquote:border-l-2 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700
                    prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>

            {related.length > 0 ? (
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">More to explore</h2>
                    <div className="divide-y mt-3">
                        {related.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blogs/${post.slug}`}
                                className="block py-3 group"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-gray-400">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent-blue transition-colors">
                                            {post.title}
                                        </h3>
                                    </div>
                                    <span className="text-xs text-gray-400">Read</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null}

            <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-gray-400 text-xs">© Ahmad Mujtaba - Scientific Intelligence</p>
            </footer>
        </article>
    );
}
