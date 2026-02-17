"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const blogs = [
    {
        title: "The Future of Design Engineering",
        excerpt: "Why the gap between design and development is closing faster than ever.",
        date: "Oct 24, 2024",
        tag: "Industry",
    },
    {
        title: "Mastering Framer Motion",
        excerpt: "A deep dive into creating complex, physics-based animations in React.",
        date: "Sep 12, 2024",
        tag: "Tutorial",
    },
    {
        title: "Dark Mode UI: Best Practices",
        excerpt: "How to design accessible and aesthetically pleasing dark themes.",
        date: "Aug 05, 2024",
        tag: "Design",
    }
];

export default function Blogs() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Thoughts & <span className="text-accent-blue">Ideas</span>.
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl">
                    Writing about design, code, and everything in between.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group glass-card p-8 rounded-3xl flex flex-col justify-between h-80 hover:bg-white transition-colors cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                            <ArrowUpRight size={32} className="text-accent-blue" />
                        </div>

                        <div className="space-y-4">
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">{blog.tag}</span>
                            <h3 className="text-2xl font-bold leading-tight group-hover:text-accent-blue transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-gray-500 line-clamp-3">
                                {blog.excerpt}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-400">{blog.date}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
