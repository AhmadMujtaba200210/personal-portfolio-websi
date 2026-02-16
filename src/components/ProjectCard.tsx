"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
    icon?: string;
}

export function ProjectCard({ title, description, category }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className="group aspect-square md:aspect-video glass-card rounded-[2.5rem] p-10 flex flex-col justify-between cursor-pointer overflow-hidden relative"
        >
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-blue/60">{category}</span>
                    <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                </div>
            </div>

            <div className="z-10">
                <p className="text-gray-500 max-w-sm line-clamp-2 transition-colors group-hover:text-gray-700">
                    {description}
                </p>
            </div>

            {/* Decorative Material Element */}
            <div className="absolute bottom-[-20%] right-[-5%] w-64 h-64 bg-gray-50 rounded-full z-0 group-hover:scale-110 transition-transform duration-700 ease-out" />
        </motion.div>
    );
}
