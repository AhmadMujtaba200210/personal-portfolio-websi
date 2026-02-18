"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function FloatingConnect() {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 items-end z-50">
            <ThemeToggle />
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-white/70 backdrop-blur-xl rounded-full shadow-lg border border-white/40 flex items-center gap-2 font-medium text-sm text-gray-600 hover:text-black group hover:border-white/80 transition-all duration-300 hover:shadow-xl dark:bg-black/50 dark:text-gray-200 dark:hover:text-white dark:border-white/10"
            >
                <span className="relative">Say Hi!</span>
                <span className="text-lg group-hover:rotate-12 transition-transform duration-300 inline-block">✌️</span>
            </motion.button>
        </div>
    );
}
