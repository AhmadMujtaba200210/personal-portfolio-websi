import { getBlogBySlug, getSiteSettings } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPageProps {
    params: Promise<{ slug: string }>;
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

    return (
        <article className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto space-y-8">
            <header className="space-y-4">
                {/* Categories & Tags from CMS */}
                <div className="flex flex-wrap gap-2">
                    {blog.categories?.map((cat: any) => (
                        <span key={cat.id} className="px-3 py-1 rounded-full bg-accent-blue/10 text-xs font-bold uppercase tracking-wider text-accent-blue">
                            {cat.name}
                        </span>
                    ))}
                    {blog.tags?.map((tag: any) => (
                        <span key={tag.id} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {tag.name}
                        </span>
                    ))}
                </div>

                <p className="text-accent-blue font-bold tracking-widest uppercase text-sm flex items-center gap-3">
                    <span>
                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    {blog.readingTime && <span>· {blog.readingTime} min read</span>}
                    {blog.author?.name && <span>· {blog.author.name}</span>}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                    {blog.title}
                </h1>
                {blog.excerpt && (
                    <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-4 border-gray-100 dark:border-gray-800 pl-6">
                        {blog.excerpt}
                    </p>
                )}
            </header>

            {/* Featured Image from CMS */}
            {blog.featuredImage && (
                <div className="w-full rounded-3xl overflow-hidden">
                    <img src={blog.featuredImage} alt={blog.title} className="w-full h-auto object-cover" />
                </div>
            )}

            <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-800 my-12" />

            {/* Content Area */}
            <div
                className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-accent-blue prose-img:rounded-3xl
                prose-blockquote:border-accent-blue prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900/50 
                prose-blockquote:py-2 prose-blockquote:rounded-r-2xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <footer className="pt-20 border-t border-gray-100 dark:border-gray-800 mt-20 text-center">
                <p className="text-gray-400 text-sm">© Ahmad Mujtaba - Scientific Intelligence</p>
            </footer>
        </article>
    );
}
