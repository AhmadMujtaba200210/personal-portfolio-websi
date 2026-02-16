"use client";

import { motion } from "framer-motion";
import {
    Square,
    Triangle,
    Circle,
    Pentagon,
    Hexagon,
    Boxes,
    Code2,
    Palette,
    Cpu,
    Layers
} from "lucide-react";

const tools = [
    { name: "SolidWorks", icon: Square, color: "text-red-500" },
    { name: "Ansys", icon: Triangle, color: "text-blue-500" },
    { name: "After Effects", icon: Circle, color: "text-purple-500" },
    { name: "Framer", icon: Pentagon, color: "text-pink-500" },
    { name: "React", icon: Hexagon, color: "text-cyan-500" },
    { name: "Next.js", icon: Boxes, color: "text-gray-900" },
    { name: "TypeScript", icon: Code2, color: "text-blue-600" },
    { name: "Tailwind", icon: Palette, color: "text-sky-400" },
    { name: "Arduino", icon: Cpu, color: "text-emerald-500" },
    { name: "Solid Edge", icon: Layers, color: "text-orange-500" },
];

export function ToolStack() {
    return (
        <section className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Expertise & Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {tools.map((tool, i) => (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:shadow-2xl hover:border-gray-200"
                    >
                        <tool.icon
                            size={32}
                            className="text-gray-400 group-hover:text-inherit transition-colors duration-300"
                            style={{ color: "initial" }} // Will be overridden by tailwind group-hover or inline
                        />
                        <span className="text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                            {tool.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
