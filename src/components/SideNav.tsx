"use client";

import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Briefcase, label: "Work", id: "work" },
    { icon: User, label: "About", id: "about" },
    { icon: Sparkles, label: "Spotlight", id: "spotlight" },
    { icon: Mail, label: "Contact", id: "contact" },
];

export function SideNav() {
    const [active, setActive] = useState("home");

    return (
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
            {navItems.map((item) => (
                <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive(item.id)}
                    className={cn(
                        "group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                        active === item.id
                            ? "bg-white shadow-lg border border-gray-100"
                            : "glass-card hover:bg-white/80"
                    )}
                >
                    <item.icon
                        size={20}
                        className={active === item.id ? "text-accent-blue" : "text-gray-400 group-hover:text-gray-600"}
                    />

                    {/* Label Tooltip */}
                    <span className="absolute left-16 px-3 py-1 rounded-lg bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {item.label}
                    </span>

                    {/* Active Indicator Dot */}
                    {active === item.id && (
                        <motion.div
                            layoutId="active-nav"
                            className="absolute -left-1 w-1 h-4 bg-accent-blue rounded-full"
                        />
                    )}
                </motion.button>
            ))}
        </nav>
    );
}
