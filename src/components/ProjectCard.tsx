"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
}

const getSuit = (category: string) => {
    if (category.includes("Trading")) return "♠";
    if (category.includes("Learning")) return "♣";
    if (category.includes("Data")) return "♦";
    return "♥";
};

const getRank = (title: string) => title.charAt(0);

export function ProjectCard({ title, description, category }: ProjectCardProps) {
    const suit = getSuit(category);
    const rank = getRank(title);
    const isRed = suit === "♥" || suit === "♦";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative w-full max-w-md bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Top Corner Suit */}
            <div className={`absolute top-3 right-3 text-2xl ${isRed ? "text-red-500" : "text-gray-800 dark:text-gray-300"}`}>
                {suit}
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className={`text-3xl font-serif font-bold ${isRed ? "text-red-500" : "text-gray-800 dark:text-gray-200"}`}>
                        {rank}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {category}
                    </span>
                </div>

                <h3 className="text-xl font-serif font-bold leading-tight text-gray-900 dark:text-white group-hover:text-accent-cyan dark:group-hover:text-accent-cyan transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>

            {/* Subtle Watermark */}
            <div className="absolute bottom-2 right-2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <span className={`text-8xl leading-none ${isRed ? "text-red-500" : "text-gray-800 dark:text-white"}`}>{suit}</span>
            </div>

            {/* Hover Indicator */}
            <div className="absolute bottom-3 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 text-accent-cyan text-xs font-bold uppercase tracking-wide">
                    View <ArrowUpRight size={12} />
                </div>
            </div>
        </motion.div>
    );
}
