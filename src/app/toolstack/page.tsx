"use client";

import { ToolStack } from "@/components/ToolStack";
import { motion } from "framer-motion";

export default function Toolstack() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Technical <span className="text-accent-blue">Arsenal</span>.
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl">
                    A comprehensive suite of languages, libraries, and platforms I leverage for quantitative research, algorithmic trading, and system engineering.
                </p>
            </motion.div>

            <ToolStack />
        </div>
    );
}
