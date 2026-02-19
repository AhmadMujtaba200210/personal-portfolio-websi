"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export default function Playground() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-24 h-24 rounded-3xl bg-gray-50 dark:bg-gray-800/60 flex items-center justify-center text-accent-blue shadow-lg border border-white dark:border-gray-700"
            >
                <Gamepad2 size={48} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Playground <span className="text-gray-300 dark:text-gray-600">Beta</span>.
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                    Experimental UI components and physics-based interactions are being built here. Check back soon!
                </p>
            </motion.div>
        </div>
    );
}
