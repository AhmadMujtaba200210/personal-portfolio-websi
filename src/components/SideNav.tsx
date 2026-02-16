"use client";

import { motion } from "framer-motion";
import { Home, Calendar, Package, Megaphone, Music } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Calendar, label: "Work", id: "work" },
    { icon: Package, label: "Projects", id: "projects" },
    { icon: Megaphone, label: "Spotlight", id: "spotlight" },
    { icon: Music, label: "Playlists", id: "playlists" },
];

export function SideNav() {
    const [active, setActive] = useState("home");

    return (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 py-6 px-3 glass-card rounded-full z-50">
            {navItems.map((item) => (
                <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive(item.id)}
                    className={cn(
                        "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        active === item.id
                            ? "bg-white shadow-md text-black"
                            : "text-gray-400 hover:text-black hover:bg-white/50"
                    )}
                >
                    <item.icon size={18} strokeWidth={2} />

                    {/* Label Tooltip */}
                    <span className="absolute left-14 px-2 py-1 rounded bg-black text-white text-[10px] font-medium opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                        {item.label}
                    </span>
                </motion.button>
            ))}
        </nav>
    );
}
