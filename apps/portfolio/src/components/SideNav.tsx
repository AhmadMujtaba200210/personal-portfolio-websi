"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    User,
    Layers,
    ShoppingBag,
    PenTool,
    Music,
    Mail,
    Gamepad2,
    Menu,
    X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    // Navigation should be expanded ONLY if user is hovering over it
    const isExpanded = isHovered;

    // Close mobile nav on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="fixed top-6 left-6 z-[60] lg:hidden w-12 h-12 rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile navigation drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.nav
                        initial={{ x: -280, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -280, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed left-0 top-0 bottom-0 w-[280px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-[58] lg:hidden flex flex-col py-24 px-6 shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                                            isActive
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold"
                                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60"
                                        )}
                                    >
                                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className="text-sm">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Desktop side navigation */}
            <motion.nav
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={{
                    width: isExpanded ? 240 : 80,
                    backgroundColor: isDark
                        ? (isExpanded ? "rgba(17, 24, 39, 0.85)" : "rgba(17, 24, 39, 0.7)")
                        : (isExpanded ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)"),
                    backdropFilter: "blur(20px)",
                    borderColor: isDark ? "rgba(55, 65, 81, 0.5)" : "rgba(255, 255, 255, 0.5)",
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
                                            ? "bg-white dark:bg-gray-800 text-black dark:text-white shadow-md border border-white/50 dark:border-gray-700"
                                            : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50"
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
        </>
    );
}
