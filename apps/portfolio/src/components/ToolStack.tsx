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

const skillCategories = [
    {
        title: "Languages & Core",
        skills: [
            { name: "Python", icon: Code2, color: "text-yellow-500" },
            { name: "C++", icon: Cpu, color: "text-blue-700" },
            { name: "SQL", icon: Database, color: "text-blue-500" },
            { name: "Java", icon: Coffee, color: "text-red-500" },
            { name: "R", icon: Sigma, color: "text-blue-400" },
            { name: "MATLAB", icon: Calculator, color: "text-orange-600" },
        ]
    },
    {
        title: "Quant Data & Analysis",
        skills: [
            { name: "Pandas", icon: FileSpreadsheet, color: "text-purple-600" },
            { name: "NumPy", icon: BoxSelect, color: "text-blue-400" },
            { name: "SciPy", icon: Binary, color: "text-blue-600" },
            { name: "Statsmodels", icon: LineChart, color: "text-indigo-600" },
            { name: "QuantLib", icon: Library, color: "text-green-600" },
        ]
    },
    {
        title: "Algo Trading & Strategy",
        skills: [
            { name: "Zipline", icon: Activity, color: "text-red-500" },
            { name: "Backtrader", icon: TrendingUp, color: "text-yellow-600" },
            { name: "TA-Lib", icon: BarChart3, color: "text-orange-500" },
            { name: "Interactive Brokers", icon: Globe, color: "text-red-700" },
            { name: "Risk Management", icon: ShieldAlert, color: "text-emerald-600" },
        ]
    },
    {
        title: "Machine Learning & AI",
        skills: [
            { name: "TensorFlow", icon: BrainCircuit, color: "text-orange-500" },
            { name: "PyTorch", icon: Flame, color: "text-red-500" },
            { name: "Scikit-learn", icon: Network, color: "text-blue-400" },
            { name: "Keras", icon: Layers, color: "text-red-600" },
            { name: "Deep Learning", icon: Brain, color: "text-yellow-500" },
        ]
    },
    {
        title: "Platforms & Engineering",
        skills: [
            { name: "Bloomberg", icon: Terminal, color: "text-orange-500" },
            { name: "AWS", icon: Cloud, color: "text-yellow-600" },
            { name: "Docker", icon: Container, color: "text-blue-500" },
            { name: "Git", icon: GitBranch, color: "text-orange-600" },
            { name: "Linux", icon: Terminal, color: "text-black" },
        ]
    }
];

export function ToolStack() {
    return (
        <section className="space-y-12">
            {skillCategories.map((category, catIndex) => (
                <div key={category.title} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-accent-cyan dark:border-accent-cyan pl-4">{category.title}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {category.skills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 dark:bg-gray-900/30"
                            >
                                <skill.icon
                                    size={28}
                                    className={`scale-100 transition-all duration-300 ${skill.color}`}
                                />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
