"use client";

import { motion } from "framer-motion";

export function FloatingConnect() {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-white/40 flex items-center gap-2 font-medium text-sm text-gray-800 hover:text-black z-50 group hover:border-white/80 transition-colors"
        >
            <span>Say Hi!</span>
            <span className="text-xl group-hover:rotate-12 transition-transform inline-block">✌️</span>
        </motion.button>
    );
}
