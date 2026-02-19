"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface BlogsClientProps {
    blogs: any[];
}

export function BlogsClient({ blogs }: BlogsClientProps) {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() => {
        const set = new Set<string>();
        for (const blog of blogs || []) {
            for (const cat of blog.categories || []) {
                if (cat?.name) set.add(cat.name);
            }
        }
        return ["All", ...Array.from(set)];
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (!blogs) return [];
        const q = query.trim().toLowerCase();
        return blogs.filter((blog) => {
            const inCategory =
                activeCategory === "All" ||
                blog.categories?.some((cat: any) => cat?.name === activeCategory);
            if (!inCategory) return false;
            if (!q) return true;
            const haystack = [
                blog.title,
                blog.excerpt,
                blog.author?.name,
                ...(blog.categories || []).map((c: any) => c?.name),
                ...(blog.tags || []).map((t: any) => t?.name),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return haystack.includes(q);
        });
    }, [blogs, activeCategory, query]);

    if (!blogs || blogs.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight">No posts yet.</h1>
                <p className="text-gray-500 mt-4">Check back later for new content.</p>
            </div>
        );
    }

    const featured = filteredBlogs[0];
    const rest = filteredBlogs.slice(1);

    return (
        <div className="min-h-screen pt-16 pb-20 px-6 md:px-10 max-w-4xl mx-auto space-y-10">
            <motion.header
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="space-y-3"
            >
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                    Journal
                </p>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Blog
                </h1>
                <p className="text-sm md:text-base text-gray-500 max-w-2xl">
                    Short, focused notes on design, engineering, and research.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                    <span>{blogs.length} articles</span>
                    <span className="h-[1px] w-6 bg-gray-200 dark:bg-gray-700" />
                    <span>{categories.length - 1} topics</span>
                </div>
            </motion.header>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 w-full md:max-w-md">
                    <Search size={14} className="text-gray-400" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={
                                "px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors border-b " +
                                (activeCategory === cat
                                    ? "text-gray-900 dark:text-white border-gray-900 dark:border-white"
                                    : "text-gray-500 dark:text-gray-300 border-transparent hover:border-gray-400")
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {featured ? (
                <Link href={`/blogs/${featured.slug}`} className="group">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-5 py-6 border-t border-b border-gray-200 dark:border-gray-800">
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-gray-400">
                                <span className="font-semibold text-accent-blue">Featured</span>
                                <span>•</span>
                                <span>{new Date(featured.createdAt).toLocaleDateString()}</span>
                                {featured.readingTime && <span>• {featured.readingTime} min read</span>}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-accent-blue transition-colors">
                                {featured.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base line-clamp-3">
                                {featured.excerpt || "Click to read more..."}
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                Read the story <ArrowRight size={14} />
                            </div>
                        </div>
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 min-h-[160px]">
                            {featured.featuredImage ? (
                                <img src={featured.featuredImage} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900" />
                            )}
                        </div>
                    </div>
                </Link>
            ) : null}

            <div className="divide-y border-t border-gray-200 dark:border-gray-800">
                {rest.map((blog, i) => (
                    <Link href={`/blogs/${blog.slug}`} key={blog.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group py-6 flex flex-col gap-3"
                        >
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-gray-400">
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-2">
                                    {blog.readingTime ? `${blog.readingTime} min read` : ""}
                                    {blog.author?.name ? `· ${blog.author.name}` : ""}
                                </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold leading-tight group-hover:text-accent-blue transition-colors text-gray-900 dark:text-white">
                                {blog.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm">
                                {blog.excerpt || "Click to read more..."}
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                                Read article <ArrowUpRight size={14} className="text-accent-blue" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
                    <p className="text-base font-semibold text-gray-700 dark:text-gray-200">No articles match your filters.</p>
                    <p className="text-sm text-gray-500 mt-2">Try a different keyword or category.</p>
                </div>
            ) : null}
        </div>
    );
}
