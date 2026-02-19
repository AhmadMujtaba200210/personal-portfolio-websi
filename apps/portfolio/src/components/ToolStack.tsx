"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Cpu,
    Database,
    Coffee,
    Sigma,
    Calculator,
    FileSpreadsheet,
    BoxSelect,
    Binary,
    LineChart,
    Library,
    Activity,
    TrendingUp,
    BarChart3,
    Globe,
    ShieldAlert,
    BrainCircuit,
    Flame,
    Network,
    Layers,
    Brain,
    Terminal,
    Cloud,
    Container,
    GitBranch
} from "lucide-react";

import * as Icons from "lucide-react";

const ICON_MAP: Record<string, any> = { ...Icons };

export function ToolStack({ categories }: { categories: any[] }) {
    if (!categories || categories.length === 0) return null;

    return (
        <section className="space-y-12">
            {categories.map((category, catIndex) => (
                <div key={category.id || category.title} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-accent-cyan dark:border-accent-cyan pl-4">{category.title}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {category.skills.map((skill: any, i: number) => {
                            const Icon = ICON_MAP[skill.icon] || Icons.Code2;
                            return (
                                <motion.div
                                    key={skill.id || skill.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 dark:bg-gray-900/30"
                                >
                                    <Icon
                                        size={28}
                                        className={`scale-100 transition-all duration-300 ${skill.color || 'text-gray-400'}`}
                                    />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </section>
    );
}
