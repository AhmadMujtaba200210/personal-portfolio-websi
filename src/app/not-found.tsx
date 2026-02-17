"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-6 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center"
            >
                <AlertTriangle size={48} />
            </motion.div>

            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">Page Not Found</h1>
                <p className="text-xl text-gray-500">The page you are looking for does not exist.</p>
            </div>

            <Link
                href="/"
                className="px-8 py-3 rounded-full bg-black text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
                <Home size={20} /> Return Home
            </Link>
        </div>
    );
}
