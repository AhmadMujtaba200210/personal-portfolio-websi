"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Placeholder to prevent hydration mismatch
    }

    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute"
            >
                <Moon size={20} className="text-cyan-400" fill="currentColor" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute"
            >
                <Sun size={20} className="text-yellow-500" fill="currentColor" />
            </motion.div>
        </motion.button>
    );
}
