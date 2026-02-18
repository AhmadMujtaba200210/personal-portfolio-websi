"use client";

import { motion } from "framer-motion";

export const Logo = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            initial="initial"
            animate="animate"
            whileHover="hover"
        >
            <motion.svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black dark:text-white"
            >
                {/* Hexagon Container */}
                <motion.path
                    d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 L50 5Z"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="text-gray-900"
                />

                {/* Internal stylized 'A' / 'M' / Graph nodes */}
                <motion.path
                    d="M30 70 L50 30 L70 70"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                        initial: { pathLength: 0, y: 10 },
                        animate: { pathLength: 1, y: 0, transition: { delay: 0.5, duration: 1 } },
                        hover: { y: -2, transition: { duration: 0.2 } }
                    }}
                />
                <motion.path
                    d="M30 70 L50 50 L70 70"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.6"
                    variants={{
                        initial: { pathLength: 0 },
                        animate: { pathLength: 1, transition: { delay: 0.8, duration: 1 } }
                    }}
                />

                {/* Nodes/Dots */}
                <motion.circle cx="30" cy="70" r="4" fill="#3B82F6" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1 } } }} />
                <motion.circle cx="50" cy="30" r="4" fill="#3B82F6" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1.1 } } }} />
                <motion.circle cx="70" cy="70" r="4" fill="#3B82F6" variants={{ initial: { scale: 0 }, animate: { scale: 1, transition: { delay: 1.2 } } }} />

                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="gradient" x1="30" y1="70" x2="70" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Subtle Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full opacity-0 blur-xl z-[-1]"
                variants={{
                    hover: { opacity: 0.2, scale: 1.2, transition: { duration: 0.3 } }
                }}
            />
        </motion.div>
    );
};
