"use client";

import { motion } from "framer-motion";
import {
    Home,
    User,
    Layers,
    ShoppingBag,
    PenTool,
    Music,
    Mail,
    Gamepad2
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import { Logo } from "@/components/Logo";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "About", href: "/about" },
    { icon: Layers, label: "Toolstack", href: "/toolstack" },
    { icon: ShoppingBag, label: "Products", href: "/products-listing" },
    { icon: PenTool, label: "Blogs", href: "/blogs" },
    { icon: Music, label: "Songs", href: "/songs" },
    { icon: Gamepad2, label: "Playground", href: "/playground" },
    { icon: Mail, label: "Contact", href: "/contact" },
];

export function SideNav() {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);
    // Navigation should be expanded ONLY if user is hovering over it
    const isExpanded = isHovered;

    return (
        <motion.nav
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                width: isExpanded ? 240 : 80,
                backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 py-6 px-4 shadow-2xl rounded-[2rem] z-50 overflow-hidden h-[80vh] items-start border border-white/20"
            style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            }}
        >
            <div className="flex flex-col gap-2 w-full h-full">
                {/* Logo Section */}
                <div className="flex items-center gap-4 px-3 mb-4">
                    <div className="min-w-[40px] flex justify-center">
                        <Logo size={40} />
                    </div>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        className="font-bold text-lg tracking-tight whitespace-nowrap"
                    >
                        Ahmad M.
                    </motion.span>
                </div>

                {/* Nav Items */}
                <div className="flex flex-col gap-2 justify-center flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative group flex items-center gap-4 px-3 py-3 rounded-full transition-all duration-300 w-full",
                                    isActive
                                        ? "bg-white text-black shadow-md border border-white/50"
                                        : "text-gray-500 hover:text-black hover:bg-white/50"
                                )}
                            >
                                <div className="relative z-10 min-w-[24px] flex items-center justify-center">
                                    <item.icon
                                        size={20}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                        opacity: isExpanded ? 1 : 0,
                                        x: isExpanded ? 0 : -10,
                                    }}
                                    style={{
                                        pointerEvents: isExpanded ? "auto" : "none",
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="font-medium whitespace-nowrap overflow-hidden text-sm"
                                >
                                    {item.label}
                                </motion.span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    );
}
