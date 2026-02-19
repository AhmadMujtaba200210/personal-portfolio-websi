"use client";

import { motion } from "framer-motion";
import { Star, Award, Zap } from "lucide-react";

const ICON_MAP: Record<string, any> = { Award, Zap, Star };

export function Spotlight({ items }: { items: any[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-4">
            {items.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || Star;
                return (
                    <motion.div
                        key={item.id || item.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-[2rem] flex items-center gap-6 group hover:bg-white dark:hover:bg-gray-800 transition-colors border border-transparent dark:border-gray-700"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-accent-blue/10 dark:group-hover:bg-accent-cyan/10 group-hover:text-accent-blue dark:group-hover:text-accent-cyan transition-colors">
                            <Icon size={28} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
